// ********************************************************************************
// File:   Redirect.js
// Author: Nick G. Toth
// Email:  nick.g.toth@gmail.com
// Date:   August 23, 2022
// 
// Overview: This component is used to extract url parameters from the router in
// App.js and pass them as props to the CA examples.
//
// ********************************************************************************

import '../App.css';

import React from 'react';
import {useParams} from 'react-router-dom';

// Import the Automaton examples.
import GameOfLife from '../Examples/GameOfLife';
import Wireworld from '../Examples/Wireworld';
import BriansBrain from '../Examples/BriansBrain';
import ElementaryCellularAutomaton from '../Examples/ElementaryCellularAutomaton';

import HelpBar from '../Help/HelpBar';
import LandingPage from './Landing';

function Redirect(props) {

  const parseColArg = (s => parseInt(s.split(':c')[1].split('r')[0])); 
  const parseRowArg = (s => parseInt(s.split(':c')[1].split('r')[1]));

  // So... For some reason, the name used here must match the name used in the path.
  // e.g. If we use path="/.../:params", then we need const { params } = useParams(); ... const { literally_anything_else } = useParams(); would not work. I don't understand this, and it has made me very frustrated.
  const { params } = useParams(); 

  const rows = parseRowArg(params),
          cols = parseColArg(params);


  // A fairly rough entry checker.
  // Note that the choice of rows and cols ≤ 128 is arbitrary, but the ui is pretty slow for much larger values.
  function entriesAreValid()
  {
    if(props.path === '/eca') {
      if (isNaN(rows) || isNaN(cols) || rows < 1 || cols < 1 || rows > 255 || cols > 128)
      { alert("Oops! At least one entry is not valid. Please make sure that your rule entry is an integer between 0 and 255, and your column entry is an integer between 1 and 128."); return false }
    }
    else{
      if (isNaN(rows) || isNaN(cols) || rows < 1 || cols < 1 || rows > 128 || cols > 128)
      { alert("Oops! At least one entry is not valid. Please make sure that your entries are integers between 1 and 128."); return false }
    }

    return true
  }

  if(!entriesAreValid()){return <LandingPage/>}

  switch(props.path)
  {
    case '/gol': return (<> <HelpBar/> <GameOfLife rows={rows} cols={cols}/></>)
    case '/ww': return (<> <HelpBar/> <Wireworld rows={rows} cols={cols}/></>)
    case '/bb': return (<> <HelpBar/> <BriansBrain rows={rows} cols={cols}/></>)
    // If you look closely, I'm passing rows to rule in this case. That was intentional; the
    // eca demo doesn't take a rows parameter (since rows=floor(cols/2)), but it does take a
    // rule, so I figured I'd just store it in the existing rows param. Probably not an
    // excellent choice, but I want to get this done quickly. :p
    case '/eca': return (<> <HelpBar/> <ElementaryCellularAutomaton cols={cols} rule={rows}/></>)
    default: return <LandingPage/>
  }
}

export default Redirect;
