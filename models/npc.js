const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const npcSchema = new Schema({
    name: {required: true, type: String}
})

const npcModel = mongoose.model("npc", npcSchema)

module.exports = npcModel