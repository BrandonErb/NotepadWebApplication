import React, { Component } from 'react'
import {InputGroup, FormControl, Button, ButtonToolbar} from 'react-bootstrap'
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

class Controls extends Component {
  constructor(props) {
    super(props);
     // Takes active tab from props if it is defined there
    this.state = {
      title: props.title || ''
    };

  }

  handleLoad = () => {
    this.props = {
      content: 'Load Test'
    };
  }

  handleSave = () => {

  }

  handleDelete = () => {

  }

  render(){
    return (
      <div>
        <div>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="title-text">Title</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Type title here"
              aria-label="Title"
              aria-describedby="title-text"
            />
          </InputGroup>
        </div>
        <div>
          <ButtonToolbar>
           <Button variant="secondary" onClick={this.handleLoad}>Load</Button>{' '}
           <Button variant="secondary" >Save</Button>{' '}
           <Button variant="secondary" >Delete</Button>
          </ButtonToolbar>
        </div>
      </div>
    );
  }
}

export default Controls
