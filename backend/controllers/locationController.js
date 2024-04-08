const Location = require('../models/locationModel');

// POST method to create a new location
async function createLocation(req, res) {
  try {
    const { name, address, phone } = req.body;
    const newLocation = new Location({ name, address, phone });
    const savedLocation = await newLocation.save();
    res.status(201).json(savedLocation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// GET method to get all locations
async function getAllLocations(req, res) {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// GET method to get a specific location by ID
async function getLocationById(req, res) {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }
    res.json(location);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// PUT method to update a location by ID
async function updateLocationById(req, res) {
  try {
    const updatedLocation = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLocation) {
      return res.status(404).json({ message: 'Location not found' });
    }
    res.json(updatedLocation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// DELETE method to delete a location by ID
async function deleteLocationById(req, res) {
  try {
    const deletedLocation = await Location.findByIdAndDelete(req.params.id);
    if (!deletedLocation) {
      return res.status(404).json({ message: 'Location not found' });
    }
    res.json({ message: 'Location deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = { createLocation, getAllLocations, getLocationById, updateLocationById, deleteLocationById };
