import neo4j from 'neo4j-driver';

let driver;

const init = async () => {
    try {
        driver = neo4j.driver(process.env.NEO4J_HOST, neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASS), { encrypted: true });
        console.log('Neo4J Connected');
    } catch (err) {
        console.log('error');
    }
};

const close = async () => {
    driver.close();
    console.log('neo4j closed');
};

export default { init, close };
export { driver };