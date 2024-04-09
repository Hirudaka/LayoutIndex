import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function DeviceList() {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    // Fetch device data from backend when component mounts
    axios.get('http://localhost:8080/devices')
      .then(response => {
        setDevices(response.data);
      })
      .catch(error => {
        console.error('Error fetching devices:', error);
      });
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <div>
      <h1>Device List</h1>
      <Link to="/addDevice">
        <button>Add Device</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Type</th>
            <th>Image</th>
            <th>Status</th>
            <th>Action</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {devices.map(device => (
            <tr key={device._id}>
              <td>{device.serialNumber}</td>
              <td>{device.type}</td>
              <td><img src={device.image} alt={device.type} style={{ width: '100px', height: '100px' }} /></td>
              <td>{device.status}</td>
              <td>
                <Link to={`/detailDevice/${device._id}`}>
                  <button>View Device</button>
                </Link>
              </td>
              <td>
                <Link to={`/updateDevice/${device._id}`}>
                  <button>Edit Device</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DeviceList;
