import { driver } from '../../config/neo4j';


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