// ********************************************************************************
// File:   HelpBar.js
// Author: Nick G. Toth
// Email:  nick.g.toth@gmail.com
// Date:   August 23, 2022
// 
// Overview: This component is a fairly rough collapsable message container that
// tells users how to navigate the CellularAutomaton UI.
//
// ********************************************************************************

import '../App.css';
import React, { useState } from 'react';

// Style to make an element unselectable.
const unselectable = { 'WebkitTouchCallout': 'none', 'WebkitUserSelect': 'none', 'KhtmlUserSelect': 'none', 'MozUserSelect': 'none', 'msUserSelect': 'none', 'userSelect': 'none' };

// This is not a particularly pretty component.
function HelpBar() {

  let [helpBarVisible, setHelpBarVisibility] = useState(true);

  const container_style = { position:'absolute', bottom:'25px', width:'100%', height:'100px', backgroundColor:'transparent' },
        bar_style = { margin:'0 auto', width:'90%', height:'100%', borderRadius:'10px', backgroundColor:'#aaaaaaf4', boxShadow:' 5px 3px 8px #000, 0px 0px 0px #fff, 0px 0px 0px #fff inset, 0px 0px 0px #fff inset' },
        close_button_style = {...unselectable, float:'right', backgroundColor:'#aaa', borderColor:'#888', marginRight:'6%', marginTop:'5px', cursor:'pointer', borderRadius:'5px', fontSize:'1em', lineHeight:'15px'},
        line1_style = {...unselectable, textAlign:'center', paddingLeft:'5px', paddingTop:'10px', fontSize:'1em' },
        line2_style = {...unselectable, textAlign:'center', paddingLeft:'5px', marginTop:'-5px', fontSize:'1em' },
        line3_style = {...unselectable, textAlign:'center', paddingLeft:'5px', marginTop:'-5px', fontSize:'1em' };

  return( helpBarVisible
    ? (<div style={container_style}>
          <button style={close_button_style} onClick={(_=> setHelpBarVisibility(false))}>&#x2715;</button>
          <div style={bar_style}>
            <h5 style={line1_style}>Click on a cell to update its status. Click and drag to update multiple cells. </h5>
            <h5 style={line2_style}>Press/hold space to advance the automaton.</h5>
            <h5 style={line3_style}>Press r to reset the grid</h5>
          </div>
        </div>)
    : null )
}

export default HelpBar;
