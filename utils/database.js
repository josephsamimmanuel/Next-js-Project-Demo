import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_URI;

const connect = async () => {
    if (!MONGODB_URI) {
        throw new Error('MONGO_URI is not defined in the environment variables');
    }
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
}

const disconnect = async () => {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
}

export { connect, disconnect };

