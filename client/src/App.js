import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import Homescreen from './screens/Homescreen';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Loginscreen from './screens/Loginscreen';
import Registerscreen from './screens/Registerscreen';
import Ticketscreen from './screens/Ticketscreen';
import { useState } from 'react';
import Bookingscreen from './screens/Bookingscreen';
import Addpackage from './screens/Addpackage';
import Selectedpackages from './screens/Selectedpackages';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Addnewroom from './screens/Addnewroom';
import Dashboard from './screens/Dashboardscreen';
import Printbookingscreen from './screens/Printbookingscreen';
import Printticketscreen from './screens/Printticketscreen';
function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/home" element={<Homescreen/>} />
          <Route path="/book/:roomid/:fromdate/:todate" element={<Bookingscreen/>} />
          <Route path="/addTicket" element={<Ticketscreen/>} />
          <Route path="https://hotel-management-five-steel.vercel.app/login" element = {<Loginscreen/>}/>
          <Route path="/register" element = {<Registerscreen/>}/>
          <Route path="/addPackage" element = {<Addpackage/>}/>
          <Route path="/addTicket/selectedPackages" element={<Selectedpackages/>} />
          <Route path="/addNewRoom" element={<Addnewroom/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/printbookingdocument" element={<Printbookingscreen/>} />
          <Route path="/printticketdocument" element={<Printticketscreen/>} />

          




        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
