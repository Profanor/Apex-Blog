import mongoose from 'mongoose';
import logger from '../logger';
import dotenv from 'dotenv';
dotenv.config();

const DB: string = process.env.MONGODB_URI || '';

const main = async () => {
    try {
        await mongoose.connect(DB);
        console.log('Connected to the database');
    } catch(error) {
        logger.error('Error connecting to the MongoDB database:', error);
    }
}
export default main;