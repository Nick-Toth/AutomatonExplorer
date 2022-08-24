// ********************************************************************************
// File:   Grid2D.js
// Author: Nick G. Toth
// Email:  nick.g.toth@gmail.com
// Date:   August 23, 2022
// 
// Overview: Grid2D is an svg object with viewbox '0 0 100 100' and a tiling of
// the viewbox by rectangular sections, defined by the Cell2D component. The
// content of the cells in Grid2D is determined by a given state matrix, and
// functions of state that determine the content of each cell (color and text),
// individually. In addition, Grid2D and Cell2D are equipped with pointer
// listeners that allow for changing cell status by clicking / dragging according
// to some given state transformer function.
//
// ********************************************************************************

import '../App.css';
import React from 'react';
import Cell2D from './Cell2D';

class Grid2D extends React.Component {

  constructor(props) {

    super(props)

    // If drag_is_active is true, then hovered tiles will be toggled.
    // Otherwise hovered tiles will be temporarily restyled while hovered.
    this.state = { drag_is_active:false, last_toggled_cell:{i:-1, j:-1} }

    this.handleDragEvent = this.handleDragEvent.bind(this)
    this.handleStartDrag = this.handleStartDrag.bind(this)
    this.handleEndDrag = this.handleEndDrag.bind(this)
  }

  // The svg viewbox is 100 by 100, and numbers of rows and
  // columns are given. It follows that the cell dimensions are
  cell_dims = { width: 100/this.props.cols, /* and */ height: 100/this.props.rows }


  // Grid2D is contained in an svg object with viewbox '0 0 100 100'. We divide 
  // this viewbox into rows*cols rectangular sections, and define a Cell object
  // (basically just an svg rect) for each of these sections in terms of 0≤i<rows
  // and 0≤j<cols. buildCell is the function that constructs these cells.
  buildCell(i,j) {
    return <Cell2D // Updates the cell's status when clicked.
                   cellClicked = { _ => this.props.cellClicked([i,j]) }
                   // Updates the cell when the mouse is held down. This allows
                   // multiple cells to be updated without lifting the pointer.
                   cellHovered = { _ => this.handleDragEvent({i:j, j:i}) } // You read that right.
                   key={[i,j]} // Required
                   // Sets the cell's status according to the given status matrix.
                   status={this.props.status[i][j]}
                   // Sets the cell's size.
                   width={this.cell_dims.width} height={this.cell_dims.height}
                   // Sets the cell's position in the grid.
                   x={j*this.cell_dims.width} y={i*this.cell_dims.height}
                   // Assigns a color function to the cell.
                   cellColor={ this.props.cellColor([i,j])}
                   // Assigns text content function to the cell.
                   cellText={ this.props.cellText([i,j])}/>
  }
  

  // handleDragEvent is used to toggle cells during drag events (e.g. mouse down + mouse move).
  // In particular, it makes sure that we don't update the state more than once for each cell;
  // obviously we don't want to repeatedly update a single cell while dragging over it.
  handleDragEvent(current_hovered_cell) {
    if(    this.state.drag_is_active // Ensures that cells are only updated during dragging while the pointer is down.
        // These are the conditions that ensure that we don't update the cell more than once.
        && this.state.last_toggled_cell.i !== current_hovered_cell.i
        && this.state.last_toggled_cell.j !== current_hovered_cell.j
      ){
      this.setState({ drag_is_active:true, i:current_hovered_cell.i, j:current_hovered_cell.j })
      this.props.cellClicked([current_hovered_cell.j, current_hovered_cell.i])
    }
  }


  // Updates drag_is_active so that hovered cells will be toggled until the press event ends.
  handleStartDrag() {
    if(!this.state.drag_is_active) {
      this.setState({ drag_is_active:true, last_toggled_cell:this.state.last_toggled_cell })
    }
  }


  // Updates drag_is_active so that hovered cells will be not be toggled once the press event ends.
  handleEndDrag() {
    if(this.state.drag_is_active) {
      this.setState({ drag_is_active:false, last_toggled_cell:{i:-1, j:-1} })
    }
  }


  // Returns an svg object partitioned into row*cols Cell objects.
  render() {
    return (<svg onPointerDown={ this.handleStartDrag } onPointerUp={ this.handleEndDrag } onPointerOut={ this.handleEndDrag }
                 viewBox='0 0 100 100' preserveAspectRatio='none' width='100%' height='100%'>
              <g> {
                // Creates a grid of cells according to props.rows and props.cols.
                (_ => {
                  const cells = []
                  for(var i = 0; i < this.props.rows; ++i)
                    for(var j = 0; j < this.props.cols; ++j)
                      cells.push(this.buildCell(i,j))
                  return cells
                })()
              } </g>
            </svg>)
  }
}

Grid2D.defaultProps = {
  // Determines the dimensions of the grid.
  rows:1, cols:1,
  // Initial status for each cell.
  status:[[0]],
  // The color of the cell is determined by a function of the cell's status.
  // The color function itself may depend on the cell's position in the grid.
  cellColor: (indices => (status => 'white')),
  // The text content of the cell is determined by this function of the cell's status.
  cellText: (indices => (status => '')),
  // Some function of a cell's indices to be called when that cell is clicked. e.g. status update.
  cellClicked:(indices => {})
}

export default Grid2D;