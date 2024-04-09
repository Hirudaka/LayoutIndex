import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function LocationList() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Fetch locations from backend when component mounts
    axios.get('http://localhost:8080/locations')
      .then(response => {
        setLocations(response.data);
      })
      .catch(error => {
        console.error('Error fetching locations:', error);
      });
  }, []);

  return (
    <div>
      <h1>Location List</h1>
      <Link to="/addLocation">
        <button>Add Location</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Devices</th>
          </tr>
        </thead>
        <tbody>
          {locations.map(location => (
            <tr key={location._id}>
              <td>{location.name}</td>
              <td>{location.address}</td>
              <td>{location.phone}</td>
              <td>
                {location.devices.map(device => (
                  <span key={device._id}>{device.serialNumber}</span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LocationList;
