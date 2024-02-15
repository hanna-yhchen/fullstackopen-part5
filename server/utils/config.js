require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT
}
