const Location = require('../models/locationModel');
const Device = require('../models/deviceModel');

const createLocation = async (req, res) => {
  const { name, address, phone, devices } = req.body;
  

  try {
    if (!name || !address || !phone || !devices || !Array.isArray(devices)) {
      return res.status(400).json({ message: "Fill all the required fields" });
    }

    const existingDevices = await Device.find({ _id: { $in: devices } });
    if (existingDevices.length !== devices.length) {
      return res.status(404).json({ message: "One or more devices not found" });
    }

    const newLocation = new Location({
      name,
      address,
      phone,
      devices: existingDevices.map(device => device._id),
    });
    const savedLocation = await newLocation.save();

    res.status(201).json(savedLocation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};



async function getAllLocations(req, res) {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

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

async function updateLocationById(req, res) {
  try {
    const { devices } = req.body;

    if (devices && !Array.isArray(devices)) {
      return res.status(400).json({ message: "Devices should be entered as array" });
    }
    if (devices) {
      const existingDevices = await Device.find({ _id: { $in: devices } });
      if (existingDevices.length !== devices.length) {
        return res.status(404).json({ message: "One or more devices not found" });
      }
    }
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
