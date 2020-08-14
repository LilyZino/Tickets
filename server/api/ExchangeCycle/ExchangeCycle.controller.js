import { driver } from '../../config/neo4j';
import Ticket from '../Ticket/Ticket.model';
import { purchaseTicket } from '../../common/tickets';

const getCycles = async ({ userId }) => {
    const session = driver.session();
    try {
        const result = await session.run(
            `MATCH p=(n)-[*1..4]->(n)
            WHERE ANY(x in nodes(p) WHERE x.userId=$userId)
            return nodes(p)`,
            { userId }
        );

        if (result.records.length === 0) {
            return ([]);
        }
        const cycles = result.records;

        cycles.forEach((item, index) => {
            cycles.splice(index + 1, item._fields[0].length - 1);
        });

        const formatedCycles = cycles.map((cycle) => {
            const formatedCycle = (cycle._fields.flat().map((node) => {
                return { ...node.properties };
            }));
            formatedCycle.pop();
            return formatedCycle;
        });

        const cyclesPath = [];

        await Promise.all(formatedCycles.map(async (cycle) => {
            const currentPath = [];

            await Promise.all(cycle.map(async (node, index, array) => {
                const start = node;
                const end = array[(index + 1) % array.length];
                const newSession = driver.session();
                const result = await newSession.run(
                    `MATCH p=(start)-[]->(end)
                        WHERE start.id="${start.id}" and end.id="${end.id}"
                        RETURN p`
                );

                console.log(result);

                currentPath.push({
                    start,
                    end,
                    relationship: result.records[0]._fields[0].segments[0].relationship.properties
                });
            }));

            cyclesPath.push(currentPath);
        }));

        return (cyclesPath);
    } finally {
        await session.close();
    }
};

export const getExchangeCycles = async (req, res) => {
    try {
        const exchanges = await getCycles(req.params);

        res.send(exchanges);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

export const addTicket = async (req, res) => {
    const session = driver.session();
    try {
        const addingNodeResult = await session.run(`CREATE (p:Ticket {
            id:"${req.body.ticket.id}",
            artist:"${req.body.ticket.artist}",
            ticketGenre:"${req.body.ticket.genre}",
            requestedGenre:"${req.body.requestedGenre}",
            userId:"${req.body.ticket.userId}"
        }) return p`);

        const addingFirstSideRelationshipsResult = await session.run(`
            MATCH (new:Ticket), (canReplaceWith:Ticket)
            WHERE canReplaceWith.ticketGenre="${req.body.requestedGenre}" AND
                    new.id="${req.body.ticket.id}"
            MERGE (new)<-[:CAN_SWITCH_WITH]-(canReplaceWith)
            RETURN canReplaceWith
        `);

        const addingSecondSideRelationshipsResult = await session.run(`
            MATCH (new:Ticket), (canBeReplacedWith:Ticket)
            WHERE new.id="${req.body.ticket.id}" AND
                    canBeReplacedWith.requestedGenre="${req.body.ticket.genre}"
            MERGE (canBeReplacedWith)<-[:CAN_SWITCH_WITH]-(new)
            RETURN canBeReplacedWith
        `);

        const ticket = await Ticket.findById(req.body.ticket.id);
        ticket.upForExchange = true;
        await ticket.save();

        res.send('ticket was added successfully');
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    } finally {
        session.close();
    }
};

export const approveExchange = async (req, res) => {
    const { exchange, getId, giveId } = req.body;
    const session = driver.session();
    try {
        const approveExchangeResult = await session.run(
            `MATCH (a {id:"${getId}"})-[r]-(b {id:"${giveId}"})
            SET r.isApproved = true`
        );

        (exchange.find((path) => path.start.id === getId && path.end.id === giveId)).relationship.isApproved = true;

        if (exchange.every((path) => path.relationship.isApproved)) {
            exchange.forEach((path) => {
                purchaseTicket(path.start.id, path.end.userId);
            });

            const deleteCompletedExchange = await session.run(
                `MATCH (a:Ticket)
                WHERE a.id IN [${exchange.map((path) => `'${path.start.id}'`).join(', ')}]
                detach delete a`
            );

            res.send({ isExchangeComplete: true });
        }

        res.send({ isExchangeComplete: false });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    } finally {
        session.close();
    }
};

export const denyExchange = async (req, res) => {
    const session = driver.session();
    try {
        const approveExchangeResult = await session.run(
            `MATCH (a {id:"${req.body.getId}"})-[r]-(b {id:"${req.body.giveId}"})
            SET r.isDenied = true`
        );

        res.send('exchange was denied successfully');
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    } finally {
        session.close();
    }
};
