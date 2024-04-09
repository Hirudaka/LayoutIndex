import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/devicedetail.css';

function DetailDevice() {
  const { id } = useParams();
  const [device, setDevice] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/devices/${id}`)
      .then(response => {
        setDevice(response.data);
      })
      .catch(error => {
        console.error('Error fetching device details:', error);
      });
  }, [id]); 

  if (!device) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="update-device-title">Device Details</h1>
    <div className="container">
    <div className="update-device-details">
    <p><strong>Serial Number:</strong> {device.serialNumber}</p>
    <p><strong>Type:</strong> {device.type}</p>
    <p><strong>Status:</strong> {device.status}</p>
    <p><strong>Image:</strong></p>
    <img src={device.image} alt={device.type} style={{ width: '200px', height: '200px' }} />
  </div>
</div>
</div>


  );
}

export default DetailDevice;
