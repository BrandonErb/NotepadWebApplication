import React, { Component } from 'react'
import Table from './Table'
import Form from './Form'
import Controls from './Controls'
import './index.css'

class App extends Component {
  state = {
    characters: [],
    notes: 'start notes',
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

  removeNote = () => {
    this.setState({notes: ''})
  }

  loadNotes = () => {

  }

  loadNote = () => {
    this.setState({notes: 'Loaded Text'})
  }

  render() {
    const { characters } = this.state;
    return (
      <div className="container">
        <Controls startNotes={this.state.notes} changeNote={this.loadNote} removeNote={this.removeNote}/>
        <Table characterData={characters} removeCharacter={this.removeCharacter} />
        <Form handleSubmit={this.handleSubmit}/>
      </div>
    );
  }

}

export default App
