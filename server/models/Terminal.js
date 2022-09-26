const {Schema, model, ObjectId} = require("mongoose")

const Command = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    password: {type: String, required: true},
})

const Terminal = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    commands: [Command]
})

module.exports = model('Terminal', Terminal)