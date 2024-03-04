const mongoose = require('mongoose').set('strictQuery', true)
const url = `mongodb+srv://rahul:5fpgXv4m1puyU8F5@cluster01.xkbmpiw.mongodb.net/vehicles?retryWrites=true&w=majority`
const vehicleSchema = new mongoose.Schema({
    Start: String,
    Destination: String,
    Type:String
})

const Vehicle = mongoose.model('vehicle', vehicleSchema)

mongoose
    .connect(url)
    .then((result) => {
        console.log('connected')

        const vehicle = new Vehicle({
            Start: "texas",
            Destination: "stockton",
            Type:"car"
        })

        return vehicle.save()
    })
    .then(() => {
        console.log('vehicle saved!')
        return mongoose.connection.close()
    })
    .catch((err) => console.log(err))