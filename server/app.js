import dotEnv from 'dotenv-extended';
import startApp from './config/express';
import startMongoose from './config/mongoose';
import neo4j from './config/neo4j'

dotEnv.load();
startMongoose();
neo4j.init();
startApp();
