const Hospital = require('../models/Hospital.js');

// Create a new hospital
// exports.createHospital = async (req, res) => {
//   try {
//     const newHospital = new Hospital(req.body);
//     await newHospital.save();
//     res.status(201).json(newHospital);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };
exports.createHospital = async (req, res) => {
    try {
      const newHospital = new Hospital(req.body);
      await newHospital.validate();
      await newHospital.save();
      res.status(201).json(newHospital);
    } catch (err) {
      if (err.name === 'ValidationError') {
        const errors = {};
        for (let field in err.errors) {
          errors[field] = err.errors[field].message;
        }
        return res.status(400).json({ errors });
      }
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  

// Get all hospitals
exports.getHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.status(200).json(hospitals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get a single hospital by ID
exports.getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    res.status(200).json(hospital);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update a hospital by ID
exports.updateHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    res.status(200).json(hospital);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a hospital by ID
exports.deleteHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndDelete(req.params.id);
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    res.status(200).json({ message: 'Hospital deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
