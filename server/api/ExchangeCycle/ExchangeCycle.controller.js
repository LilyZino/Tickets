import { driver } from '../../config/neo4j';
import Ticket from '../Ticket/Ticket.model';

export const getExchangeCycles = async (req, res) => {
    const session = driver.session();

    console.log(req.params.userId);
    try {
        const result = await session.run(
            `MATCH p=(n)-[*1..4]->(n)
            WHERE ANY(x in nodes(p) WHERE x.userId=$userId)
            return nodes(p)`,
            { userId: req.params.userId }
        );

        // const result = await session.run(
        //     `MATCH p=(n)-[*1..4]->(n) 
        //     return nodes(p)`
        // );

        if (result.records.length === 0) {
            res.send([]);
        } else {
            const cycles = result.records;

            cycles.forEach((item, index) => {
                cycles.splice(index + 1, item._fields.flat().length - 1);
            });

            // console.log(cycles._fields.flat());
            const formatedCycles = cycles.map((cycle) => {
                const formatedCycle = (cycle._fields.flat().map((node) => {
                    return { ...node.properties };
                }));
                formatedCycle.pop();
                return formatedCycle;
            });

            res.send(formatedCycles);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    } finally {
        await session.close();
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