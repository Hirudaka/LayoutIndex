import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/addLocation.css';

function AddLocation() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [devices, setDevices] = useState([]);
  const [availableDevices, setAvailableDevices] = useState([]);

  useEffect(() => {
    // Fetch available devices from backend when component mounts
    axios.get('http://localhost:8080/devices')
      .then(response => {
        setAvailableDevices(response.data);
      })
      .catch(error => {
        console.error('Error fetching devices:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/locations', {
        name,
        address,
        phone,
        devices
      });
      // Redirect to location list page after successful creation
      window.location.href = '/Locations';
    } catch (error) {
      console.error('Error creating location:', error);
    }
  };

  return (
    <div className="add-location-container">
      <h1 className="update-device-title">Add Location</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div>
          <label>Devices: **(press & hold control to select multiple)</label>
          <select multiple value={devices} onChange={(e) => setDevices(Array.from(e.target.selectedOptions, option => option.value))} required>
            {availableDevices.map(device => (
              <option key={device._id} value={device._id}>{device.serialNumber}</option>
            ))}
          </select>
        </div>
        <button type="submit">Add Location</button>
      </form>
    </div>
  );
}

export default AddLocation;
