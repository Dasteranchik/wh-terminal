const {Schema, model} = require("mongoose")

const Command = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    password: {type: String, required: true},
})

module.exports = model('Command', Command)