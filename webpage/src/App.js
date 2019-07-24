import React, { Component } from 'react'
import NavTabs from './NavTabs'
import Table from './Table'
import Form from './Form'
import './index.css'

class App extends Component {
  state = {
    characters: [],
    notes: {
      title: 'new note',
      content: '',
    },
    activeTab : 1
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

  render() {
    const { characters } = this.state;
    return (
      <div className="container">
        <NavTabs/>
        <Table characterData={characters} removeCharacter={this.removeCharacter} />
        <Form handleSubmit={this.handleSubmit}/>
      </div>
    );
  }

}

export default App
