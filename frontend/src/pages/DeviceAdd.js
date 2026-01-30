import React, { useState } from 'react';
import axios from 'axios';
import '../css/addDevice.css';


function DeviceAdd() {
  const [serialNumber, setSerialNumber] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/devices', {
        serialNumber,
        type,
        image,
        status
      });
      // Redirect to device list page after successful addition
      window.location.href = '/Devices';
    } catch (error) {
      console.error('Error adding device:', error);
    }
  };

  return (
    <div>
      <h1 className="update-device-title">Add Device</h1>
      <form className="add-device-form" onSubmit={handleSubmit}>
        <div>
          <label>Serial Number:</label>
          <input type="text" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} required />
        </div>
        <div>
          <label>Type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="">Select Type</option>
            <option value="pos">POS</option>
            <option value="kiosk">Kiosk</option>
            <option value="signage">Signage</option>
          </select>
        </div>
        <div>
          <label>Image URL:</label>
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
        </div>
        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <button type="submit">Add Device</button>
      </form>
    </div>
  );
}

export default DeviceAdd;
