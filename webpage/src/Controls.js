import React, { Component } from 'react'
import {InputGroup, FormControl, Button, ButtonToolbar} from 'react-bootstrap'
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import TextBox from './Text'
import NavTabs from './NavTabs'

class Controls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: this.props.startNotes
    }
    this.NewText = React.createRef();
  }

  handleLoad = () => {
    this.setState({notes: 'Load State Change'})
    this.props.changeNote()
  }

  handleLoadAll = () => {
    const newText = this.NewText.current
    this.setState({newNotes: newText.state.currentNotes})
  }

  handleSave = () => {

  }

  handleDelete = () => {
    this.setState({notes: 'deleted'})
    this.props.removeNote()
  }

  changeActiveTab = key => {
    this.setState({activeTab: key})
  }

  handleChange = (event) => {
    this.setState({title: event.target.value})
  }

  render(){
    return (
      <div>
        <div>
          <NavTabs tabKey={this.state.activeTab} tabLabels={this.state.notes} changeKey={this.changeActiveTab}/>
          <TextBox startNotes={this.state.notes} ref={this.NewText}/>
          <InputGroup className="title-box">
            <InputGroup.Prepend>
              <InputGroup.Text id="title-text">Title</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Type title here"
              onChange={this.handleChange.bind(this)}
            />
          </InputGroup>
        </div>
        <div>
          <ButtonToolbar>
           <Button variant="secondary" onClick={this.handleLoad}>Load</Button>
           <Button variant="secondary" onClick={this.handleLoadAll.bind(this)} className="button">Load All</Button>
           <Button variant="secondary" >Save</Button>
           <Button variant="secondary" onClick={this.handleDelete}>Delete</Button>
          </ButtonToolbar>
        </div>
      </div>
    );
  }
}

export default Controls
