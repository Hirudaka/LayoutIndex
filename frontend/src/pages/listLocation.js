import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/listLocation.css';   

function LocationList() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/locations')
      .then(response => {
        setLocations(response.data);
      })
      .catch(error => {
        console.error('Error fetching locations:', error);
      });
  }, []);
 
  useEffect(() => {
    const fetchDeviceDetails = async () => {
      try {
        const updatedLocations = await Promise.all(
          locations.map(async location => {
            const devices = await Promise.all(
              location.devices.map(async deviceId => {
                const deviceDetails = await axios.get(`http://localhost:8080/devices/${deviceId}`);
                return deviceDetails.data;
              })
            );
            return { ...location, devices };
          })
        );
        setLocations(updatedLocations);
      } catch (error) {
        console.error('Error fetching device details:', error);
      }
    };

    fetchDeviceDetails();
  }, [locations]);

  return (
    <div>
      <h1 className="update-device-title">Location List</h1>
      <div className="button-container">
        <Link to="/addLocation">
          <button className="action-button">Add Location</button>
        </Link>
        <Link to="/devices">
          <button className="action-button">Device List</button>
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Devices</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {locations.map(location => (
            <tr key={location._id}>
              <td>{location.name}</td>
              <td>{location.address}</td>
              <td>{location.phone}</td>
              <td>
                <ul>
                  {location.devices.map(device => (
                    <li key={device._id}>{device.serialNumber}</li>
                  ))}
                </ul>
              </td>
              <td>
                <Link to={`/updateLocation/${location._id}`}>
                  <button className="action-button">Edit</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LocationList;
