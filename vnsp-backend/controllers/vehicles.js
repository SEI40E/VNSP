
const vehiclesRouter = require('express').Router()
const Vehicle = require('../models/vehicle')

vehiclesRouter.get('/', async (request, response) => {
    const vehicles = await Vehicle.find({});
    response.json(vehicles);
});
vehiclesRouter.get('/:id', async(request, response) => {
    const vehicle = await Vehicle.findById(request.params.id);
    if (vehicle) {
        response.json(vehicle);
    } else {
        response.status(404).end();
    }
})


vehiclesRouter.post('/', async (request, response, next) => {
    const body = request.body

    const vehicle = new Vehicle({
        Start: body.Start,
        Destination: body.Destination,
        Type:body.Type

    })
    const savedVehicle = await vehicle.save()
    response.status(201).json(savedVehicle)
})

vehiclesRouter.delete('/:id', async (request, response) => {
    await Vehicle.findByIdAndRemove(request.params.id);
    response.status(204).end();

})
vehiclesRouter.put('/:id', (request, response) => {
    const body=request.body
    const Start=body.Start
    const Destination=body.Destination
    const Type=body.Type

    Vehicle.findByIdAndUpdate(request.params.id)
        .then(existingData => {
            if (!existingData) {
                return response.status(404).json({ error: 'Vehicle not found' });
            }
            existingData.Start = Start;
            existingData.Destination = Destination;
            existingData.Type = Type;

            return existingData.save();
        })
        .then(updatedData => {
            response.json(updatedData);
        })
        .catch(err => {
            response.status(500).json({ error: 'Unable to update vehicle' });
        });

})

module.exports=vehiclesRouter