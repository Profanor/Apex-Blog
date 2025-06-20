import mongoose from 'mongoose';
import logger from '../logger';
import dotenv from 'dotenv';
dotenv.config();

const isDocker = process.env.DOCKER === 'true';

const DB = isDocker
  ? 'mongodb://mongo:27017/apexblogdb'
  : process.env.MONGODB_URI || '';

const main = async () => {
  try {
    // optional: clean logging and warning suppression
    mongoose.set('strictQuery', true);

    await mongoose.connect(DB);
    logger.info(`🛢️ Connected to MongoDB (${isDocker ? 'Docker' : 'Atlas'})`);
  } catch (error) {
    logger.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

export default main;
