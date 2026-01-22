const Device = require('../models/deviceModel');

async function createDevice(req, res) {
  
  try {
    const { serialNumber, type, image, status } = req.body;
    const newDevice = new Device({ serialNumber, type, image, status });
    const savedDevice = await newDevice.save();
    res.status(201).json(savedDevice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


async function getAllDevices(req, res) {
  try {
    const devices = await Device.find();
    res.json(devices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function getDeviceById(req, res) {
  try {
    const device = await Device.findById(req.params.id);
    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }
    res.json(device);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function updateDeviceById(req, res) {
  try {
    const updatedDevice = await Device.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDevice) {
      return res.status(404).json({ message: 'Device not found' });
    }
    res.json(updatedDevice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function deleteDeviceById(req, res) {
  try {
    const deletedDevice = await Device.findByIdAndDelete(req.params.id);
    if (!deletedDevice) {
      return res.status(404).json({ message: 'Device not found' });
    }
    res.json({ message: 'Device deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = { createDevice, getAllDevices, getDeviceById, updateDeviceById, deleteDeviceById };
