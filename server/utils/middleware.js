const mongooseError = require('mongoose').Error
const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const requestLogger = (request, response, next) => {
  logger.info(request.method, request.path)
  logger.info(request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  if (error instanceof mongooseError.CastError) {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error instanceof mongooseError.ValidationError) {
    return response.status(400).json({ error: error.message })
  } else if (error instanceof jwt.JsonWebTokenError) {
    return response.status(401).json({ error: error.message })
  } else {
    next(error)
  }
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('Authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }
  next()
}

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (typeof decodedToken === 'string' || !decodedToken.id) {
    throw new jwt.JsonWebTokenError('invalid token')
  }
  const user = await User.findById(decodedToken.id)
  request.user = user
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}
