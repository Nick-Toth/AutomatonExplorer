// ********************************************************************************
// File:   CellularAutomaton.js
// Author: Nick G. Toth
// Email:  nick.g.toth@gmail.com
// Date:   August 23, 2022
// 
// Overview: This is a base component for any cellular automaton implementation.
// It consists of a Grid2D, and various functions for managing the state of the
// automata. Perhaps the most important function in this component, nextGeneration,
// is defined in terms of a generalized neighborhood function, passed as a prop,
// and works by updating each cell based on neighborhoods in the current generation
// according to a given cell-specific update function.
//
// If you're making an automaton, consider using an existing derivation of this
// component (e.g. MooreAutomaton), or first defining a new derivation which
// includes only the neighborhood function that your new automaton requires.
//
// ********************************************************************************

import '../App.css';
import React from 'react';
import Grid2D from '../Grid/Grid2D';

class CellularAutomaton extends React.Component {

  constructor(props) {
    super(props)

    // A matrix containing the status of every cell in
    // the grid. Cells are initialized as a function of
    // cell position according to props.initialStatus.
    this.state = {
      status:(_ => {
        let initial_status = []
        for(var i = 0; i < this.props.rows; ++i) {
          initial_status.push([])
          for(var j = 0; j < this.props.cols; ++j) {
            initial_status[i].push(this.props.initialStatus(i,j))
          }
        }
        return initial_status
      })()
    }

    this.resetStatus = this.resetStatus.bind(this)
    this.cellClicked = this.cellClicked.bind(this)
    this.updateCells = this.updateCells.bind(this)
  }


  // Cells are reset in the same way they were initialized.
  resetStatus() {
    let empty_status = []
    for(var i = 0; i < this.props.rows; ++i) {
      empty_status.push([])
      for(var j = 0; j < this.props.cols; ++j) {
        empty_status[i].push(this.props.initialStatus(i,j))
      }
    }
    this.setState({ status:empty_status })
  
    // Calls the given resetChild function, which may be used to 
    // update state in a child. For example, this is used to update
    // the iteration counter in ElementaryCellularAutomaton.js.
    this.props.resetChild();
  }


  // Toggles a given cell's status according to props.toggleStatus.
  cellClicked(indices) {
    const [i,j] = indices; // Unpack the cell's indices.
    const new_status = [...this.state.status]
    new_status[i][j] = this.props.toggleStatus(new_status[i][j])
    this.setState({ status:new_status })
  }


  // Updates the whole grid at once, to eliminate unnecessary
  // rendering when moving to a new generation.
  updateCells(new_cells) {
    this.setState({ status:new_cells });
    this.props.updateChild();
  }


  // Adds key listeners for advancing automata, clearing
  // the grid, and possibly more in future updates.
  componentDidMount() {
    document.body.addEventListener('keydown', e => {
      if(e.key === ' ') { this.nextGeneration(); }
      if(e.key === 'r') { this.resetStatus(); }
    });
  }


  // Applies the props.stepCell function to each cell in the grid.
  // Since we generally don't want to consider updated cell status as
  // we update, the new status of each cell is stored in a new grid,
  // and passed to the updateCells function at the end.
  nextGeneration() {
    let next_generation = []
    for(var i = 0; i < this.props.rows; ++i) {
      next_generation.push([])
      for(var j = 0; j < this.props.cols; ++j) {
        next_generation[i].push(this.props.stepCell(i, j, this.props.neighborhood(i, j, this.state.status), this.state.status[i][j]))
      }
    }
    this.updateCells(next_generation)
  }


  // Returns a Grid2D component configured for interactive cellular automata visualizations.
  render() {
    return (<Grid2D rows={this.props.rows} cols={this.props.cols}
                    status={this.state.status}
                    cellColor={this.props.cellColor}
                    cellClicked={this.cellClicked}
                    stepCell={this.props.stepCell}/>)
  }
}

CellularAutomaton.defaultProps = {
  // Determines the dimensions of the grid.
  rows:1, cols:1,
  // neighborhood defines a cell's neighborhood in the grid.
  // e.g. For the game of life, wireworld, and brian's brain, this should be defined as the Moore neighborhood.
  neighborhood:((i,j,props,status) => {}),
  // stepCell determines how a cell's status should change between generations.
  stepCell:((i,j, neighborhood, status_ij) => {}),
  // Determines the initial status of a cell in terms of its coordinates.
  initialStatus:((i,j) => 0),
  // The color of the cell is determined by a function of the cell's status.
  // The color function itself may depend on the cell's position in the grid.
  cellColor: (indices => (status => 'white')),
  // updateChild is an optional function that can be used to update the state of child component state between generations.
  updateChild: (_ => {}),
  // resetChild is an optional function that can be used to reset child state when the resetStatus function is executed (r-key press event).
  resetChild: (_ => {}),
}

export default CellularAutomaton;