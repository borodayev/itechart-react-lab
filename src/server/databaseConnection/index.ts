import MongoDBConnection from './MongoDBConnection';

const connection = new MongoDBConnection(process.env.MONGODB_URI || '');

export default connection;
