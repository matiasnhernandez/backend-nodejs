require('dotenv').config({ path: __dirname + '/' + process.env.NODE_ENV + '.env' })

module.exports = {
    NODE_ENV:process.env.NODE_ENV || 'development',
    PORT:process.env.PORT || 3000,
    MONGO_URL:process.env.MONGO_URL || 'mongodb://localhost/backend-nodejs',
    JWT_SECRET:process.env.JWT_SECRET || 'LALA SECRET PASSWORD',
    JWT_EXPIRES:process.env.JWT_EXPIRES || '1d'
}