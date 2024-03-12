import mongoose, { Connection, ConnectOptions } from 'mongoose';
import { MONGODB_URI } from './environment';

class MongoDB {
  private static instance: MongoDB;
  private connection: Connection;

  private constructor() {

    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined.');
    }

    const options: ConnectOptions = {
      serverSelectionTimeoutMS: 10000,
    };

    this.connection = mongoose.createConnection(MONGODB_URI, options);

    this.connection.on('connected', () => {
      console.log('Connected to MongoDB');
    });

    this.connection.on('error', (err) => {
      console.error('Error connecting to MongoDB:', err);
    });

    this.connection.on('disconnected', () => {
      console.log('Disconnected from MongoDB');
    });


  }

  public static getInstance(): MongoDB {
    if (!MongoDB.instance) {
      MongoDB.instance = new MongoDB();
    }
    return MongoDB.instance;
  }

  public getConnection(): Connection {
    return this.connection;
  }
}

export default MongoDB;
