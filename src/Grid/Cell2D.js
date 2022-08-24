// ********************************************************************************
// File:   Cell2D.js
// Author: Nick G. Toth
// Email:  nick.g.toth@gmail.com
// Date:   August 23, 2022
// 
// Overview: This component is essentially just a glorified <g><rect/><text/></g>,
// and a delegate of Grid2D. In other words, Cell2D is a colored rectangle with
// optional text fit to the container, and equipped with pointer listeners for
// managing external state and a highlight effect hovering the poniter over a
// cell.
//
// ********************************************************************************

import '../App.css';
import React from 'react';

// Style to make an element unselectable.
const unselectable = { 'WebkitTouchCallout': 'none', 'WebkitUserSelect': 'none', 'KhtmlUserSelect': 'none', 'MozUserSelect': 'none', 'msUserSelect': 'none', 'userSelect': 'none' };

class Cell2D extends React.Component {

  constructor(props) {
    super(props)

    // hover_effect_on is true for a given cell while the pointer is
    // over the cell. This is how highlighting is turned on and off.
    this.state = { hover_effect_on:false }

    this.toggleHoverEffect = this.toggleHoverEffect.bind(this)
    this.handleStartDrag = this.handleStartDrag.bind(this)
    this.handleMoveDrag = this.handleMoveDrag.bind(this)
    this.handleEndDrag = this.handleEndDrag.bind(this)
  }


  // Toggles cell highlighting for hover handlers.
  toggleHoverEffect() {
    this.setState( state => ({hover_effect_on:!state.hover_effect_on}))
  }


  // Updates the cell content when clicked or hovered with the pointer down.
  handleStartDrag() {
    this.props.cellClicked();
  }


  // Updates cell highlighting as the mouse moves across the grid.
  handleMoveDrag() {
    this.props.cellHovered();
    this.toggleHoverEffect();
  }


  // Removes cell highlighting when the pointer leaves the cell.
  handleEndDrag() {
    this.setState({ hover_effect_on:false })
  }


  // Returns an svg <g> element .....
  render() {
    return(
      <g // Using onClick at this point would work fine when clicking this cell, but it would lead
         // to the first cell being ignored when clicking and dragging to toggle multiple cells at once.
         onPointerDown={ this.handleStartDrag }
         // Toggles hovered cells while the mouse is down, and temporarily highlights hovered cells otherwise.
         onPointerOver={ this.handleMoveDrag }
         // Removes the cell highlighting when a cell is no longer being hovered.
         onPointerOut={ this.handleEndDrag }>
        <rect
          // Change the opacity of hovered cell to indicate that the cell is being
          // hovered over. This isn't necessary, but I think it looks nicer.
          style={ {opacity:(this.state.hover_effect_on? '0.75' : '1')} }
          // I think this looks nicer than the default cursor. 
          cursor='pointer'
          // Sets the cell's position in the grid.
          x={this.props.x} y={this.props.y}
          // Sets the cell's dimensions.
          width={this.props.width} height={this.props.height}
          // Sets the cell's color.
          fill={this.props.cellColor(this.props.status)}
          // Gives the cell a border.
          stroke={this.props.border_color} strokeWidth={this.props.border_width}/>
        <text pointerEvents='none' cursor='pointer' style={unselectable} y={this.props.y+this.props.height*.875} x={this.props.x+this.props.width*0.125} textLength={this.props.width*0.75} fontSize={this.props.height}lengthAdjust="spacingAndGlyphs">
          { this.props.cellText(this.props.status) }
        </text>
      </g>)
  }
}


Cell2D.defaultProps = {
  // Cell position and size.
  x:0.0, y:0.0,
  width:1.0, height:1.0,
  // Styling for grid-lines. Set width to 0 for if you don't want grid-lines.
  border_color:'black', border_width:'0.1',
  // Initial status
  status: 0,
  // The color of the cell is determined by this function of the cell's status.
  cellColor: (status => 'white'),
  // The text content of the cell is determined by this function of the cell's status.
  cellText: (status => ''),
  // Some function to be called when the cell is clicked. e.g. status update.
  cellClicked:(_ => {}),
  // Some function to be called when the cell is hovered. e.g. Update while pointer is down.
  cellHovered:(_ => {})
}

export default Cell2D;