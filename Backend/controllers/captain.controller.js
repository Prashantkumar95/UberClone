const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');

module.exports.registerCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    // Ensure vehicle object is valid
    if (!vehicle || !vehicle.color || !vehicle.plate || !vehicle.capacity || !vehicle.vehicleType) {
        return res.status(400).json({ errors: [{ msg: "All vehicle fields are required" }] });
    }

    const isCaptainAlreadyExist = await captainModel.findOne({ email });

    if (isCaptainAlreadyExist) {
        return res.status(400).json({ errors: [{ msg: "Captain already exists" }] });
    }

    const hashedPassword = await captainModel.hashPassword(password);

    try {
        // Pass the values inside the vehicle object
        const captain = await captainService.createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType  // Pass vehicleType correctly
        });

        const token = captain.generateAuthToken();
        res.status(201).json({ captain, token });
    } catch (error) {
        console.error(error.message);  // Log error message for debugging
        res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
    }
};
