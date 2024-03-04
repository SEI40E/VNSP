const mongoose = require('mongoose').set('strictQuery', true)


const vehicleSchema = new mongoose.Schema({
    Start: String,
    Destination: String,
    Type:String


})
vehicleSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Vehicle', vehicleSchema)
