import { Mongoose } from 'mongoose';
import { Connection as TypeormConnection } from 'typeorm';
import ConnectionDriver from './ConnectionDriver';
import MongoDBConnectionDriver from './MongoDBConnectionDriver';
import PostgreSQLConnectionDriver from './PostgreSQLConnectionDriver';

const ConnectionDriverFactory = (
  dbType: string
): ConnectionDriver<Mongoose | TypeormConnection> => {
  if (dbType === 'mongodb') {
    return new MongoDBConnectionDriver(process.env.MONGODB_URI || '');
  }

  if (dbType === 'postgres') {
    return new PostgreSQLConnectionDriver();
  }

  throw new Error(`DB: ${dbType} is not supported`);
};

export default ConnectionDriverFactory(process.env.DB_TYPE || '');
