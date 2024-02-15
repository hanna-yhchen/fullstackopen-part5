const config = require('./server/utils/config')
const app = require('./server/app')
const { connectToMongoDB } = require('./server/utils/database')
const logger = require('./server/utils/logger')

connectToMongoDB()

const PORT = config.PORT || 8080
app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`)
})
