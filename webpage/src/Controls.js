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
      notes: this.props.startNotes,
      activeTab: this.props.currentTab
      }
  }

  handleLoad = async () => {
    await this.props.loadNote(this.state, this.state.notes[this.state.activeTab-1].title, this.state.activeTab)
  }

  handleLoadAll = async () => {
    await this.props.loadNotes(this.state)

    this.setState({newNotes: this.props.startNotes})
    let newState = Object.assign({}, this.state)
    newState = {notes: this.state.newNotes, activeTab: this.props.currentTab}
    this.setState(newState)
  }

  handleSave = async () => {
    await this.props.saveNote(this.state, this.state.notes[this.state.activeTab-1])
    this.setState({newNotes: this.props.startNotes})
  }

  handleDelete = async () => {
    await this.props.deleteNote(this.state, this.state.notes[this.state.activeTab-1].title, this.state.activeTab)
    let newState = Object.assign({}, this.state)
    newState = {notes: this.props.startNotes, newNotes: this.props.startNotes, activeTab: this.props.currentTab}
    this.setState(newState)
  }

  changeActiveTab = key => {
    this.setState({activeTab: key})
  }

  changeText = newText => {
    let newState = Object.assign({}, this.state)
    newState.notes[this.state.activeTab-1] = {content: newText, title: this.state.notes[this.state.activeTab-1].title}
    this.setState(newState)
  }

  handleChange = (event) => {
    let newState = Object.assign({}, this.state)
    newState.notes[this.state.activeTab-1] = {title: event.target.value, content: this.state.notes[this.state.activeTab-1].content}
    this.setState(newState)
  }

  handleNew = () => {
    this.setState({ notes:[...this.state.notes, {title:'New Note', content: ''}] })
    this.setState({ activeTab: this.state.notes.length + 1})
  }

  render(){

    const titleValue = this.state.notes[this.state.activeTab-1].title

    return (
      <div>
        <div>
          <NavTabs tabKey={this.state.activeTab} tabLabels={this.state.notes} changeKey={this.changeActiveTab}/>
          <TextBox startNotes={this.state.notes[this.state.activeTab-1].content} changeText={this.changeText}/>
          <InputGroup className="title-box">
            <InputGroup.Prepend>
              <InputGroup.Text id="title-text">Title</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              defaultValue={this.state.notes[this.state.activeTab-1].title}
              onBlur={this.handleChange.bind(this)}
              onKeyPress={event => {
              if (event.key === "Enter") {
                this.handleChange(event);
              }
              }}
              name="titleValue"
              key={`titleValue:${titleValue}`}
            />
          </InputGroup>
        </div>
        <div>
          <ButtonToolbar>
            <Button variant="secondary" onClick={this.handleNew.bind(this)} className="button">New</Button>
            <Button variant="secondary" onClick={this.handleLoad.bind(this)} className="button">Load</Button>
            <Button variant="secondary" onClick={this.handleLoadAll.bind(this)} className="button">Load All</Button>
            <Button variant="secondary" onClick={this.handleSave.bind(this)} className="button">Save</Button>
            <Button variant="secondary" onClick={this.handleDelete.bind(this)} className="button">Delete</Button>
          </ButtonToolbar>
        </div>
      </div>
    );
  }
}

export default Controls
