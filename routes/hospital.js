const express = require('express');
const router = express.Router();
const hospitalController = require('../controller/hospitalController');

// Create a new hospital
router.post('/hospitals/new', hospitalController.createHospital);

// Get all hospitals
router.get('/hospitals', hospitalController.getHospitals);

// Get a single hospital by ID
router.get('/hospitals/:id', hospitalController.getHospitalById);

// Update a hospital by ID
router.put('/hospitals/:id', hospitalController.updateHospital);

// Delete a hospital by ID
router.delete('/hospitals/:id', hospitalController.deleteHospital);

module.exports = router;
