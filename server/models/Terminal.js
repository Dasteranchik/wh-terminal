const {Schema, model, ObjectId} = require("mongoose")

const SubCommand = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    password: {type: String, required: true}
})

const Command = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    password: {type: String, required: true},
    commands: [SubCommand]
})

const Terminal = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    commands: [Command]
})

module.exports = model('Terminal', Terminal)