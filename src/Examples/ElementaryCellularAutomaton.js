// ********************************************************************************
// File:   ElementaryCellularAutomaton.js
// Author: Nick G. Toth
// Email:  nick.g.toth@gmail.com
// Date:   August 23, 2022
// 
// Overview: This is an implementation of Stephen Wolfram's elementary cellular
// automata in terms of the MooreAutomaton component. For more info, see:
// https://en.wikipedia.org/wiki/Elementary_cellular_automaton
//
// ********************************************************************************

import '../App.css';
import React from 'react';
import MooreAutomaton from '../Automaton/MooreAutomaton';

class ElementaryCellularAutomaton extends React.Component {

  constructor(props) {
    super(props)

    // Elementary Cellular Automata are one-dimensional. We can make the visualization
    // nicer by stacking 1-dimensional Automata one top of each other. The iteration
    // counter indicates the row where the next iteration will be displayed.
    this.state = { iteration:1 }

    this.updateChild = this.updateChild.bind(this)
    this.resetChild = this.resetChild.bind(this)
    this.stepCell = this.stepCell.bind(this)
    this.initialStatus = this.initialStatus.bind(this)
  }

  // There are 2 possible cell states in an elementary cellular automaton
  // This function can be used to increment a cell's status modulo 2.
  toggleStatus(status){ return (status+1) % 2}


  // updateChild is used to increment the iteration count between generations.
  // It is called in the updateCells function in the CellularAutomaton component.
  updateChild(){ this.setState({ iteration:this.state.iteration+1 }) }
  // resetChild is used to reset the state in this component when the grid is reset.
  // It is called in the reset function in the CellularAutomaton component.
  resetChild(){ this.setState({ iteration:1 }) }

  // Determines how each cell is initialized based on its position in the grid.
  initialStatus(i,j){
    // This isn't exactly necessary, but it's a nice way to start out the automaton.
    // I suspect it will also make things easier for any users who aren't sure how
    // the elementary cellular automata work. ¯\_(ツ)_/¯
    if(i === 0 && j === Math.floor(this.props.cols/2)){ return 1 }
    return 0
  }


  // Defines how a cell changes between generations depending on its neighbors.
  stepCell(i, j, neighborhood, status_ij) {

    // This is a lazy way of ensuring that only cells in the new row are updated.
    if(i !== this.state.iteration) { return status_ij }

    // This ensures that we don't access cells outside of the grid.
    // i.e. the successor function accesses cells to the left and right of (i,j).
    if(j < 1 || j > this.props.cols-2) { return status_ij }

    // This function builds a rule function corresponding to a wolfram code.
    const rule = (wolfram_code => {
      const n_str = wolfram_code.toString(2),
            rule_string = '0'.repeat(8-n_str.length)+n_str;
      return (x => parseInt(rule_string['76543210'.indexOf(x)]))
    })

    // Applies the rule corresponding to props.rule to the cell.
    const successor = (status => {
      let sum = status[0]*4 + status[3]*2 + status[5]
      return rule(this.props.rule)(sum)
    })

    // Apply the update rule.
    return successor(neighborhood) // i === this.state.iteration
  }


  // Returns a MooreAutomaton configured for elementary cellular automata.
  render() {
    return ( <MooreAutomaton rows={Math.floor(this.props.cols/2)} cols={this.props.cols}
                             initialStatus={this.initialStatus}
                             toggleStatus={this.toggleStatus}
                             updateChild={this.updateChild}
                             resetChild={this.resetChild}
                             stepCell={this.stepCell}
                             // Unlike the usual cell coloring functions, this function shades
                             // the row where cells should be changed by the user to affect the
                             // next generation. I think this makes things more intuitive.
                             cellColor={([i,j]) => (status => {
                               if(i === this.state.iteration-1){ return ['#222', '#eee'][status]}
                               return ['#333', '#fff'][status];
                             })}/>)
  }
}

ElementaryCellularAutomaton.defaultProps = {
  // Determines the numbers of rows and columns in the grid.
  cols:5, // We will set rows = cols/2 for this automaton, since the grid is bounded.
  rule:30, // A number from 0 to 255 corresponding to one of the possible elementary cellular automaton rules.
}

export default ElementaryCellularAutomaton;