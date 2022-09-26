const {Schema, model, ObjectId} = require("mongoose")

const Terminal = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    commands: [{type: ObjectId, ref:'File'}]
})

module.exports = model('Terminal', Terminal)