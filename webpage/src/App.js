import React, { Component } from 'react'
import NavTabs from './NavTabs'
import Table from './Table'
import Form from './Form'
import TextBox from './Text'
import Controls from './Controls'
import './index.css'

class App extends Component {
  state = {
    characters: [],
    notes: {
      title: 'new note',
      content: 'start of note',
    },
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

  render() {
    const { characters } = this.state;
    return (
      <div className="container">
        <NavTabs/>
        <TextBox/>
        <Controls/>
        <Table characterData={characters} removeCharacter={this.removeCharacter} />
        <Form handleSubmit={this.handleSubmit}/>
      </div>
    );
  }

}

export default App
