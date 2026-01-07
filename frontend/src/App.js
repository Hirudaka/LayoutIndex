import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AddDevice from "./pages/DeviceAdd";
import DeviceList from "./pages/DeviceList";
import DeviceUpdate from "./pages/DeviceUpdate";
import DeviceDetail from "./pages/DeviceDetail";
import AddLocation from "./pages/locationAdd";
import UpdateLoaction from "./pages/LocationUpdate";
import AllLocation from "./pages/listLocation";

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/addDevice" element={<AddDevice/>} />
        <Route path="/Devices" element={<DeviceList/>} />
        <Route path="/updateDevice/:id" element={<DeviceUpdate/>} />
        <Route path="/detailDevice/:id" element={<DeviceDetail/>} />
        <Route path="/addLocation" element={<AddLocation/>} />
        <Route path='/Locations' element={<AllLocation/>} />
        <Route path='/updateLocation/:id' element={<UpdateLoaction/>} />
      </Routes>
    </Router>
  );
}

export default App;
