import { driver } from '../../config/neo4j';

export const getExchangeCycles = async (req, res) => {
    const session = driver.session();

    try {
        const result = await session.run(
            `MATCH p=(n)-[*1..4]->(n) 
            WHERE ANY(x in nodes(p) WHERE x.userId="5e3d6d9fcaf48635a4e83e28")
            return p`
            // { name: personName }
        );

        // the db will return as many pathes as nodes in the cycles, each path starts from a different node
        const path1 = result.records[0];
        const path2 = result.records[1];
        const path3 = result.records[2];

        // every records have a single field, that containts a node array
        const nodesInPath = singleRecord.get(0);

        console.log(node[0].properties.name);
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
            CREATE (canReplaceWith)<-[:CAN_SWITCH_WITH]-(new)
            RETURN canReplaceWith
        `);

        const addingSecondSideRelationshipsResult = await session.run(`
            MATCH (new:Ticket), (canBeReplacedWith:Ticket)
            WHERE new.id="${req.body.ticket.id}" AND
                    canBeReplacedWith.requestedGenre="${req.body.ticket.genre}"
            MERGE (new)<-[:CAN_SWITCH_WITH]-(canBeReplacedWith)
            RETURN canBeReplacedWith
        `);

        res.send('ticket was added successfully');
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    } finally {
        session.close();
    }
};