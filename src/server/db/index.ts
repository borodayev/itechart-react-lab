import DB from './DB';

const db = new DB(process.env.MONGODB_URI || '');

export default db;
