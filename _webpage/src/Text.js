import React, { Component } from 'react'
import {Form, FormGroup, FormControl} from 'react-bootstrap'
import './index.css'

class TextBox extends Component {
  constructor(props) {
    super(props);
     // Takes active tab from props if it is defined there
    this.state = {
      notes: this.props.startNotes
    };
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.startNotes !== prevState.notes) {
      return {
        notes: nextProps.startNotes,
      };
    }
    // Return null if the state hasn't changed
    return null;
  }

  handleChange = (event) => {
    this.setState({currentNotes: event.target.value})
    this.props.changeText(event.target.value)
  }

  render(){
    const textValue = this.state.notes;

    return (
      <div>
      <Form>
        <FormGroup controlId="content-text">
          <FormControl
            as="textarea"
            rows="20"
            defaultValue={textValue}
            onBlur={this.handleChange.bind(this)}
            name="textValue"
            key={`textValue:${textValue}`}/>
        </FormGroup>
      </Form>
      </div>
    );
  }
}

export default TextBox
