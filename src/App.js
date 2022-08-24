// ********************************************************************************
// File:   App.js
// Author: Nick G. Toth
// Email:  nick.g.toth@gmail.com
// Date:   August 23, 2022
//
// ********************************************************************************

import './App.css';
import React from 'react';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

import LandingPage from './Landing/Landing';
import Redirect from './Landing/Redirect';

function App() {
  return (<BrowserRouter>
            <Routes>
              <Route exact path="/" element={<LandingPage/>}/>
              <Route exact path="/gol/:params" element={<Redirect path='/gol'/>}/>
              <Route exact path="/ww/:params" element={<Redirect path='/ww'/>}/>
              <Route exact path="/bb/:params" element={<Redirect path='/bb'/>}/>
              <Route exact path="/eca/:params" element={<Redirect path='/eca'/>}/>
            </Routes>
          </BrowserRouter>)
}


export default App;

