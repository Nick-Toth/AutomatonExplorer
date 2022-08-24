// ********************************************************************************
// File:   Landing.js
// Author: Nick G. Toth
// Email:  nick.g.toth@gmail.com
// Date:   August 23, 2022
// 
// Overview: This component is a fairly rough landing page UI for choosing one of
// the automaton examples.
//
// ********************************************************************************

import '../App.css';
import React, {useState} from 'react';

// Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function StartButton(props) {
  // Passes the rows and columns as url parameters... It was really fun figuring this out.............
  return ( <Button variant="primary" href={ (props.link + '/:c' + props.cols.toString() + 'r'+props.rows.toString()) } style={{marginTop:'15px'}} > Start </Button> )
}
StartButton.defaultProps = { link:'', rows:0, cols:0 }


function LandingPage()
{
  const [demo, setDemo] = useState({name:'Choose Demo', path:'/'})
  const [grid_dimensions, setGridDimensions] = useState({ rows:30, cols:30 })

  return (<div style={{width:'100%', height:'100%'}}>

    <div style={{ position:'absolute', width:'100%', margin:'0 auto', marginTop:'50px', display:'flex'}}>

      <Form style={{margin:'0 auto'}} >
        <DropdownButton style={{margin:'0 auto',position:'relative'}} id="dropdown-basic-button" title={demo.name}>
          <Dropdown.Item onClick={_ => {setDemo({name:"Game of Life", path:'/gol'}); }}>Game of Life</Dropdown.Item>
          <Dropdown.Item onClick={_ => {setDemo({name:"Wireworld", path:'/ww'}); }}>Wireworld</Dropdown.Item>
          <Dropdown.Item onClick={_ => {setDemo({name:"Brian's Brain", path:'/bb'}); }}>Brian's Brain</Dropdown.Item> 
          <Dropdown.Item onClick={_ => {setDemo({name:"Elementary CA", path:'/eca'}); }}>Elementary Cellular Automaton</Dropdown.Item>
        </DropdownButton>

        <Form.Group className="mb-3" controlId="cols" /*style={{marginTop:'15px'}}*/ style={demo.name==='Choose Demo'? {marginTop:'15px', display:'none'} : {marginTop:'15px', display:'block'}}>
          <Form.Label>Columns</Form.Label>
          <Form.Control defaultValue={grid_dimensions.cols} onChange={e => {setGridDimensions({ rows:parseInt(grid_dimensions.rows), cols:parseInt(e.target.value) }); } } style={{width:'200px'}}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="rows" style={demo.name==='Choose Demo'? {display:'none'} : {display:'block'}}/*style={demo.name==='Elementary CA'? {display:'none'} : {display:'block'}}*/>
          <Form.Label>{demo.name==='Elementary CA'? 'Wolfram Code' : 'Rows'}</Form.Label>
          <Form.Control defaultValue={grid_dimensions.rows} onChange={e => {setGridDimensions({ rows:parseInt(e.target.value), cols:parseInt(grid_dimensions.cols) })} } style={{width:'200px'}}/>
        </Form.Group>

        <StartButton link={demo.path} rows={parseInt(grid_dimensions.rows)} cols={parseInt(grid_dimensions.cols)}/>

      </Form>

    </div>
  </div>)
}

export default LandingPage;
