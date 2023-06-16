const mongoose  = require('mongoose')

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`Db connected on ${conn.connection.host}`)
}

module.exports = connectDB