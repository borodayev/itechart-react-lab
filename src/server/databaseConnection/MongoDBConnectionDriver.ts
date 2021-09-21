import mongoose, { ConnectOptions, Mongoose } from 'mongoose';
import ConnectionDriver from './ConnectionDriver';

export default class MongoDBConnectionDriver
  implements ConnectionDriver<Mongoose>
{
  private uri: string;

  private options?: ConnectOptions;

  constructor(uri: string, options?: ConnectOptions) {
    this.uri = uri;
    this.options = options;
  }

  connect(): Promise<Mongoose> {
    return mongoose.connect(this.uri, this.options);
  }

  disconnect(): Promise<void> {
    return mongoose.disconnect();
  }

  getConnection(): Promise<Mongoose> {
    return new Promise((res) => res);
  }
}
