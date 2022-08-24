// ********************************************************************************
// File:   Wireworld.js
// Author: Nick G. Toth
// Email:  nick.g.toth@gmail.com
// Date:   August 23, 2022
// 
// Overview: This is an implementation of Brian Silverman's Wireworld
// automaton in terms of the MooreAutomaton component. For more info, see:
// https://en.wikipedia.org/wiki/Wireworld
//
// ********************************************************************************

import '../App.css';
import MooreAutomaton from '../Automaton/MooreAutomaton';
import React from 'react';

class Wireworld extends React.Component {

  // Defines how a cell changes between generations depending on its neighbors.
  stepCell(i, j, neighborhood, status_ij) {
    if(status_ij === 0)
      status_ij = 0
    else if(status_ij === 1)
      status_ij = 2
    else if(status_ij === 2)
      status_ij = 3
    else{
      let electron_head_neighbors = 0
      for(var n = 0; n < neighborhood.length; ++n)
        if(neighborhood[n] === 1)
        electron_head_neighbors += 1
      if(electron_head_neighbors === 1 || electron_head_neighbors === 2)
        status_ij = 1
    }

    return status_ij
  }


  // There are 4 possible cell states in Wireworld.
  // This function can be used to increment a cell's status modulo 4.
  // Increments by 3 for convenience (i.e. the user will probably use
  // the conductor status (3) more than anything else).
  toggleStatus(status){ return (status+3) % 4}


  // Returns a MooreAutomaton configured for Wireworld.
  render() {
    return ( <MooreAutomaton rows={this.props.rows} cols={this.props.cols}
                             toggleStatus={this.toggleStatus}
                             stepCell={this.stepCell}
                             cellColor={_ => (status => ['#333', '#4dbeff', 'tomato', '#f7ff66'][status])}/>)
  }
}

Wireworld.defaultProps = {
  // Determines the numbers of rows and columns in the grid.
  rows:7, cols:7
}

export default Wireworld;