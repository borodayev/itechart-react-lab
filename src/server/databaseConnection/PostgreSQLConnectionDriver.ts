import 'reflect-metadata';
import {
  createConnection,
  Connection,
  ConnectionManager,
  getConnectionManager
} from 'typeorm';
import ProductEntity from '../models/product/ProductTypeOrmEntity';
import CategoryEntity from '../models/category/CategoryTypeOrmEntity';
import ConnectionDriver from './ConnectionDriver';

export default class PostgreSQLConnection
  implements ConnectionDriver<Connection>
{
  private connectionManager: ConnectionManager;

  private connectionName = 'default';

  constructor() {
    this.connectionManager = getConnectionManager();
  }

  async getConnection(): Promise<Connection> {
    let connection = this.connectionManager.get(this.connectionName);
    if (!connection) connection = await this.connect();
    if (!connection?.isConnected) connection = await connection.connect();
    return connection;
  }

  async connect(): Promise<Connection> {
    const connection = await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'www',
      password: 'root',
      entities: [ProductEntity, CategoryEntity],
      database: 'itechart',
      synchronize: true,
      logging: true
    });

    return connection;
  }

  disconnect(): Promise<void> {
    return this.connectionManager.get(this.connectionName).close();
  }
}
