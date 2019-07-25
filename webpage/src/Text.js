import React, { Component } from 'react'
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

class TextBox extends Component {
  constructor(props) {
    super(props);
     // Takes active tab from props if it is defined there
    this.state = {
      notes: props.notes || 'Type here'
    };
  }

  render(){
    return (
      <form>
        <div class="form-group">
          <textarea class="form-control" rows="20" id="text">{this.state.notes}</textarea>
        </div>
      </form>
    );
  }
}

export default TextBox
