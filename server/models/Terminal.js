const {Schema, model, ObjectId} = require("mongoose")

const SubCommand = new Schema({
    title: {type: String},
    description: {type: String},
    password: {type: String}
})

const Command = new Schema({
    title: {type: String},
    description: {type: String},
    password: {type: String},
    commands: [SubCommand]
})

const Terminal = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    commands: [Command]
})

module.exports = model('Terminal', Terminal)