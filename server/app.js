import dotEnv from 'dotenv-extended';
import startApp from './config/express';
import startMongoose from './config/mongoose';

dotEnv.load();
startMongoose();
startApp();
