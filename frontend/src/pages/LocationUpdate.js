import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/locationUpdate.css';

function EditLocation() {
  const { id } = useParams();
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

    // Fetch location details from backend when component mounts
    axios.get(`http://localhost:8080/locations/${id}`)
      .then(response => {
        const location = response.data;
        setName(location.name);
        setAddress(location.address);
        setPhone(location.phone);
        setDevices(location.devices);
      })
      .catch(error => {
        console.error('Error fetching location details:', error);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/locations/${id}`, {
        name,
        address,
        phone,
        devices
      });
      window.location.href = '/locations';
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/locations/${id}`);
      window.location.href = '/locations';
    } catch (error) {
      console.error('Error deleting location:', error);
    }
  };

  return (
    <div className="edit-location-container">
      <h1>Edit Location</h1>
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
          <label>Devices:</label>
          <select multiple value={devices} onChange={(e) => setDevices(Array.from(e.target.selectedOptions, option => option.value))} required>
            {availableDevices.map(device => (
              <option key={device._id} value={device._id}>{device.serialNumber}</option>
            ))}
          </select>
        </div>
        <button type="submit">Update Location</button>
        <button type="button" onClick={handleDelete} className="delete-button">Delete Location</button>
      </form>
    </div>
  );
}

export default EditLocation;
