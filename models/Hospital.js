const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a hospital name'],
  },
  address: {
    type: String,
    required: [true, 'Please enter a hospital address'],
  },
  phone: {
    type: String,
    required: [true, 'Please enter a hospital phone number'],
    match: [
        /^\d{10}$/, 
        'Please enter a valid 10-digit phone number'
      ]
  },
  capacity: {
    type: Number,
    required: [true, 'Please enter a hospital capacity'],
  },
  specialties: {
    type: [String],
    required: [true, 'Please enter a hospital specialties'],
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Hospital', hospitalSchema);
