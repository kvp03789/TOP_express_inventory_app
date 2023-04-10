const mongoose = require('mongoose')

const connectToDatabase = ()=> {
    const mongoURI = 'mongodb+srv://admin:azmcn1077@cluster0.tiieckz.mongodb.net/inventory?retryWrites=true&w=majority'
    mongoose.set('strictQuery', 'false')

    async function main() {
        await mongoose.connect(`${mongoURI}`)
    }
    main().catch((err) => console.log(err))

    console.log("connected to mongodb")
}

module.exports = connectToDatabase