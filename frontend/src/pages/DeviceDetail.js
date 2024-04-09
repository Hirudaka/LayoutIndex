import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function DetailDevice() {
  const { id } = useParams();
  const [device, setDevice] = useState(null);

  useEffect(() => {
    // Fetch device data from backend when component mounts
    axios.get(`http://localhost:8080/devices/${id}`)
      .then(response => {
        setDevice(response.data);
      })
      .catch(error => {
        console.error('Error fetching device details:', error);
      });
  }, [id]); // Re-run effect whenever the id parameter changes

  if (!device) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Device Details</h1>
      <p><strong>Serial Number:</strong> {device.serialNumber}</p>
      <p><strong>Type:</strong> {device.type}</p>
      <p><strong>Status:</strong> {device.status}</p>
      <p><strong>Image:</strong></p>
      <img src={device.image} alt={device.type} style={{ width: '200px', height: '200px' }} />
    </div>
  );
}

export default DetailDevice;
