const {Schema, model} = require("mongoose")

const SubCommand = new Schema({
    title: {type: String},
    description: {type: String},
    flag: {type: Boolean}
})

const Command = new Schema({
    title: {type: String},
    description: {type: String},
    password: {type: String},
    commands: [SubCommand],
    hackingCommand: {type: String},
    flagPassword: {type: Boolean},
    flag: {type: Boolean}
})

const Terminal = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    commands: [Command]
})

module.exports = model('Terminal', Terminal)