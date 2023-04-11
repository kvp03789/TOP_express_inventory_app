const mongoose = require('mongoose')
require('dotenv').config()

const connectToDatabase = ()=> {
    const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tiieckz.mongodb.net/inventory?retryWrites=true&w=majority`
    mongoose.set('strictQuery', 'false')

    async function main() {
        await mongoose.connect(`${mongoURI}`)
    }
    main().catch((err) => console.log(err))

    console.log("connected to mongodb")
}

module.exports = connectToDatabase