// ********************************************************************************
// File:   MooreAutomaton.js
// Author: Nick G. Toth
// Email:  nick.g.toth@gmail.com
// Date:   August 23, 2022
// 
// Overview: This is simply a derivation of the CellularAutomaton component that
// defines the neighborhood function as the Moore neighborhood. The Moore
// neighborhood of a cell consists of the eight surrounding cells. Currently, this
// wraps around as in the identification space of a torus for cells on the edge.
//
// ********************************************************************************

import CellularAutomaton from './CellularAutomaton';
import React from 'react';

// This is basically a CellularAutomaton component with a Moore neighborhood function. Many
// CAs use this type of neighborhood, and it would be silly to include this function in each
// implementation, so I figured it would be nice to add this class so that automata such as GoL,
// Brian's Brain, and Wireworld can be implemented simply by adding rules to this component.
class MooreAutomaton extends React.Component {

  constructor(props) {
    super(props)
    this.mooreNeighborhood = this.mooreNeighborhood.bind(this)
  }


  // Returns an array containing the status of every cell
  // in the moore neighborhood of a particular cell.
  mooreNeighborhood(i, j, status) {
    let mn = []
    for(var u = -1; u < 2; u++) {
      for (var v = -1; v < 2; v++) {
        if(u !== 0 || v !== 0) {
          // Method 1:
          // With this condition, the sides of the grid will wrap around.
          mn.push(status[(i + v + this.props.rows) % this.props.rows][(j + u + this.props.cols) % this.props.cols])

          // Method 2:
          // With this condition, the (invisible) boundary cells are treated as dead cells.
          //if (0 <= i-u && i-u < this.props.rows && 0 <= j-v && j-v < this.props.cols) { mn.push(status[i-u][j-v]) }
        }
      }
    }
    return mn
  }


  // Returns a CellularAutomaton whose neighborhood is predefined as the Moore neighborhood.
  render() { return <CellularAutomaton {...this.props} neighborhood={this.mooreNeighborhood}/> }
}

MooreAutomaton.defaultProps = {
  // Determines the numbers of rows and columns in the grid.
  rows:1, cols:1,
  // The color of the cell is determined by a function of the cell's status.
  // The color function itself may depend on the cell's position in the grid.
  cellColor: (indices => (status => 'white')),
  stepCell:((i,j) => {}),
}

export default MooreAutomaton;