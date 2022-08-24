// ********************************************************************************
// File:   BriansBrain.js
// Author: Nick G. Toth
// Email:  nick.g.toth@gmail.com
// Date:   August 23, 2022
// 
// Overview: This is an implementation of Brian Silverman's "Brain's Brain"
// automaton in terms of the MooreAutomaton component. For more info, see:
// https://en.wikipedia.org/wiki/Brian%27s_Brain
//
// ********************************************************************************

import '../App.css';
import MooreAutomaton from '../Automaton/MooreAutomaton';
import React from 'react';

class BriansBrain extends React.Component {

  // Defines how a cell changes between generations depending on its neighbors.
  stepCell(i, j, neighborhood, status_ij) {
    if(status_ij === 1)
      return 2
    else if(status_ij === 2)
      return 0
    let living_neighbors = 0;
    for(var n = 0; n < neighborhood.length; ++n)
      if(neighborhood[n] === 1)
        living_neighbors += 1
    if(living_neighbors === 2)
      return 1;
  
    return status_ij
  }


  // There are 3 possible cell states in Brian's Brain.
  // This function can be used to increment a cell's status modulo 3.
  toggleStatus(status){ return (status+1) % 3}


  // Returns a MooreAutomaton configured for Brian's Brain.
  render() {
    return (<MooreAutomaton rows={this.props.rows} cols={this.props.cols}
                            toggleStatus={this.toggleStatus}
                            stepCell={this.stepCell}
                            cellColor={ _ => (status => ['#333', '#fff', '#194bff'][status])}/>)
  }
}

BriansBrain.defaultProps = {
  // Determines the numbers of rows and columns in the grid.
  rows:7, cols:7
}

export default BriansBrain;