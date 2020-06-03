import { driver } from '../../config/neo4j';
import Ticket from '../Ticket/Ticket.model';

export const getExchangeCycles = async (req, res) => {
    const session = driver.session();

    try {
        // const result = await session.run(
        //     `MATCH p=(n)-[*1..4]->(n)
        //     WHERE ANY(x in nodes(p) WHERE x.userId=userId)
        //     return p`,
        //     { userId: req.body.userId }
        // );

        const result = await session.run(
            `MATCH p=(n)-[*1..4]->(n) 
            return nodes(p)`
        );

        console.log(result.records[0]._fields.flat());
        const formatedCycle = result.records[0]._fields.flat().map((node) => {
            return { ...node.properties };
        });

        formatedCycle.pop();

        res.send(formatedCycle);

        // every records have a single field, that containts a node array
        // const nodesInPath = singleRecord.get(0);

        // console.log(node[0].properties.name);
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
            MERGE (canReplaceWith)<-[:CAN_SWITCH_WITH]-(new)
            RETURN canReplaceWith
        `);

        const addingSecondSideRelationshipsResult = await session.run(`
            MATCH (new:Ticket), (canBeReplacedWith:Ticket)
            WHERE new.id="${req.body.ticket.id}" AND
                    canBeReplacedWith.requestedGenre="${req.body.ticket.genre}"
            MERGE (new)<-[:CAN_SWITCH_WITH]-(canBeReplacedWith)
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