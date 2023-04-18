const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
require('dotenv').config()

const DB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tiieckz.mongodb.net/inventory?retryWrites=true&w=majority`

const storage = new