const config = require('./config')
const logger = require('./logger')
const mongoose = require('mongoose')

async function connectToMongoDB() {
  logger.info(`Connecting to ${config.MONGODB_URI}`)
  try {
    mongoose.set('strictQuery', false)
    mongoose.connect(config.MONGODB_URI)
    logger.info('Successfully connected to MongoDB.')
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error.message}`)
  }
}

module.exports = { connectToMongoDB }
