import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/updateDevice.css';

function UpdateDevice() {
  const { id } = useParams();
  const [serialNumber, setSerialNumber] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Fetch device details from backend when component mounts
    axios.get(`http://localhost:8080/devices/${id}`)
      .then(response => {
        const device = response.data;
        setSerialNumber(device.serialNumber);
        setType(device.type);
        setImage(device.image);
        setStatus(device.status);
      })
      .catch(error => {
        console.error('Error fetching device details:', error);
      });
  }, [id]); // Re-run effect whenever the id parameter changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/devices/${id}`, {
        serialNumber,
        type,
        image,
        status
      });
      // Redirect to device list page after successful update
      window.location.href = '/Devices';
    } catch (error) {
      console.error('Error updating device:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/devices/${id}`);
      // Redirect to device list page after successful deletion
      window.location.href = '/Devices';
    } catch (error) {
      console.error('Error deleting device:', error);
    }
  };

  return (
    <div>
      <h1 className="update-device-title">Update Device</h1>

      <form onSubmit={handleSubmit} className="update-device-form">
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
          <label>Image:</label>
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
        <div className="button-container">
          <button type="submit">Update Device</button>
          <button className="delete-button" onClick={handleDelete}>Delete Device</button>
        </div>
      </form>
    </div>
  );
  
}

export default UpdateDevice;
