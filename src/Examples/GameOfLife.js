// ********************************************************************************
// File:   GameOfLife.js
// Author: Nick G. Toth
// Email:  nick.g.toth@gmail.com
// Date:   August 23, 2022
// 
// Overview: This is an implementation of John Conway's Game of Life
// automaton in terms of the MooreAutomaton component. For more info, see:
// https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
//
// ********************************************************************************

import '../App.css';
import MooreAutomaton from '../Automaton/MooreAutomaton';
import React, { } from 'react';

class GameOfLife extends React.Component {
  
  // Defines how a cell changes between generations depending on its neighbors.
  stepCell(i, j, neighborhood, status_ij) {
    let living_neighbors = 0
    for(var n = 0; n < neighborhood.length; ++n)
      if(neighborhood[n] === 1)
        living_neighbors += 1
    if (living_neighbors < 2 || living_neighbors > 3)
      status_ij = 0
    else if (living_neighbors === 3)
      status_ij = 1
    return status_ij
  }


  // There are 2 possible cell states in Conway's Game of Life.
  // This function can be used to increment a cell's status modulo 2.
  toggleStatus(status){ return (status+1) % 2}


  // Returns a MooreAutomaton configured for Conway's Game of Life.
  render() {
    return ( <MooreAutomaton rows={this.props.rows} cols={this.props.cols}
                             toggleStatus={this.toggleStatus}
                             stepCell={this.stepCell}
                             cellColor={_ => (status => ['#333', '#fff'][status])}/>)
  }
}

GameOfLife.defaultProps = {
  // Determines the numbers of rows and columns in the grid.
  rows:7, cols:7
}

export default GameOfLife;