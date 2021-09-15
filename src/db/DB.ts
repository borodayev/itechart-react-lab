import mongoose, { Connection, ConnectOptions } from 'mongoose';

export default class DB {
  private connection: Connection;

  private uri: string;

  private options?: ConnectOptions;

  constructor(uri: string, options?: ConnectOptions) {
    this.uri = uri;
    this.options = options;
    this.connection = mongoose.createConnection();
  }

  getConnection(): Connection {
    return this.connection;
  }

  connect(): Promise<Connection> {
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

  close(): void {
    this.connection.close();
  }
}
