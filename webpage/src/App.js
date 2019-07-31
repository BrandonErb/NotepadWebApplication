import React, { Component } from 'react'
import Table from './Table'
import Form from './Form'
import Controls from './Controls'
import './index.css'

class App extends Component {
  state = {
    characters: [],
    notes: [{
      title: 'Test Note 1',
      content: 'this is test note one content'
    },{
      title: 'Test Note 2',
      content: 'this is test note two content'
    },{
      title: 'Test Note 3',
      content: 'this is test note three content'
    }],
    activeTab : 1,
  }

  removeCharacter = index => {
  const { characters } = this.state

  this.setState({
    characters: characters.filter((character, i) => {
      return i !== index
    }),
  })
  }

  handleSubmit = character => {
    this.setState({ characters: [...this.state.characters, character] })
  }

  saveNote = () => {

  }

  removeNote = (note) => {
    this.setState({notes: note })
  }

  loadNotes = () => {

  }

  loadNote = () => {

  }

  //Updates state on top parent
  //Called before REST calls to ensure matching state
  changeNote = (note, tab) => {
    let newState = Object.assign({}, this.state)
    newState.notes[tab-1] = {note}
    this.setState(newState)
  }

  render() {
    const { characters } = this.state;
    return (
      <div className="container">
        <Controls startNotes={this.state.notes} changeNote={this.changeNote} deleteNote={this.removeNote} saveNote={this.saveNote} loadNote={this.loadNote} loadNotes={this.loadNotes}/>
        <Table characterData={characters} removeCharacter={this.removeCharacter} />
        <Form handleSubmit={this.handleSubmit}/>
      </div>
    );
  }

}

export default App
