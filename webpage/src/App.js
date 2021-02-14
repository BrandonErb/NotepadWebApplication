import React, { Component } from 'react'
import axios from 'axios'
import Controls from './Controls'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
  state = {
    newNotes: [],
    notes: [{
      title: 'New Note',
      content: ' '
    }],
    activeTab : 1,
  }

  saveNote = (state, note) => {
    this.setState(state)
    this.setState({newNote: note})
    if(this.state.notes[this.state.activeTab-1].title === note.title)
    {
      const result = axios.put( url + note.title, null,{ params:{
        text: note.content
      }})
         .then((response) => {
           console.log(response);
         })
         .catch((error) => {
           console.log(error);
         })
       return result
    }
    else{
      const result = axios.post( url + 'add', null,{ params:{
        id: note.title, text: note.content
      }})
         .then((response) => {
           console.log(response);
         })
         .catch((error) => {
           console.log(error);
         })
       return result
    }
  }

  removeNote = (state, noteId, tab) => {
    this.setState(state)
    this.setState({newNotes: []})
    const result = axios.delete(url + noteId)
      .then((response) => {
        console.log(response)
        var index = tab - 1
        this.setState((prevState) => ({
          notes: [...prevState.notes.slice(0,index), ...prevState.notes.slice(index + 1)]
        }))
      })
      .catch((error) => {
        console.log(error);
      })
      if(tab !== 1){
        this.setState({activeTab: tab-1})
      }
      if(this.state.notes === undefined || this.state.notes.length <= 1){
        this.setState({ notes:[...this.state.notes, {title:'Empty Note', content: ''}]})
      }
    return result
  }

  loadNotes = (state) => {
    this.setState(state)
    this.setState({activeTab: 1})
    this.setState({newNotes: []})
    const result = axios.get(url + 'note')
        .then((response) => {
          console.log(response.data);
          var res = response.data.data
          for(let i = 0; i < res.length; i++){
            this.setState({ newNotes:[...this.state.newNotes, {title: res[i].note_id, content: res[i].note_text}]})
          }
          this.setState({notes: this.state.newNotes})
        })
       .catch((error) => {
         console.log(error);
       })
    return result
  }

  loadNote = (state, noteId, tab) => {
    this.setState(state)
    axios.get(url + noteId)
        .then((response) => {
          console.log(response);
          let newState = Object.assign({}, this.state)
          newState.notes[tab-1] = {title: response.data.data.note_id, content: response.data.data.note_text}
          this.setState(newState)
        })
        .catch((error) => {
          console.log(error);
        })
  }

  //Updates state on top parent
  //Called before REST calls to ensure matching state
  changeNote = (note, tab) => {
    let newState = Object.assign({}, this.state)
    newState.notes[tab-1] = {note}
    this.setState(newState)
  }

  render() {
    return (
      <div className="container">
        <Controls startNotes={this.state.notes} currentTab={this.state.activeTab} changeNote={this.changeNote} deleteNote={this.removeNote} saveNote={this.saveNote} loadNote={this.loadNote} loadNotes={this.loadNotes}/>
      </div>
    );
  }

}

//URL for webservice
//const url = 'http://localhost:8000/notes/'
const url = 'http://ec2-34-238-122-74.compute-1.amazonaws.com:8000/notes/'

export default App
