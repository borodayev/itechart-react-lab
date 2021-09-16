import mongoose, {
  Connection as MongooseConnection,
  ConnectOptions
} from 'mongoose';
import type Connection from './Connection';

export default class MongoDBConnection
  implements Connection<MongooseConnection>
{
  private connection: MongooseConnection;

  private uri: string;

  private options?: ConnectOptions;

  constructor(uri: string, options?: ConnectOptions) {
    this.uri = uri;
    this.options = options;
    this.connection = mongoose.createConnection();
  }

  get(): MongooseConnection {
    return this.connection;
  }

  connect(): Promise<MongooseConnection> {
    return new Promise((resolve, reject) => {
      this.connection.once('open', () => {
        resolve(this.connection);
      });

      this.connection.on('error', (e) => {
        reject(e);
      });

      this.connection.openUri(this.uri, this.options);
    });
  }

  disconnect(): void {
    this.connection.close();
  }
}
