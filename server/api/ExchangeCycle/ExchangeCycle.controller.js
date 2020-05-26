import { driver } from '../../config/neo4j';

export const getExchangeCycles = async (req, res) => {
    const session = driver.session();

    try {
        const result = await session.run(
            'MATCH p=(n)-[*1..4]->(n) RETURN nodes(p)'
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
            genre:"${req.body.ticket.genre}"
        }) return p`);

        const addingRelationshipsResult = await session.run(`
            MATCH (n:Ticket), (p:Ticket)
            WHERE n.genre="${req.body.requestedGenre}" AND p.id="${req.body.ticket.id}"
            CREATE (p)<-[:CAN_SWITCH_WITH]-(n)
            RETURN p
        `);

        console.log(addingRelationshipsResult);

        res.send('ticket was added successfully');
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    } finally {
        session.close();
    }
};