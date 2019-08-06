import React, { Component } from 'react'
import {Tab, Tabs} from 'react-bootstrap'
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

class NavTabs extends Component {
  constructor(props) {
    super(props);
     // Takes active tab from props if it is defined there
    this.state = {
      activeTab: this.props.tabKey,
      notes: this.props.tabLabels,
    };

    // Bind the handleSelect function already here (not in the render function)
   this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(selectedTab) {
    // The active tab must be set into the state so that
    // the Tabs component knows about the change and re-renders.
    this.setState({
      activeTab: selectedTab
    });

    this.props.changeKey(selectedTab);
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.tabKey !== prevState.activeTab || nextProps.tabLabels !== prevState.notes) {
      return {
        notes: nextProps.tabLabels,
        activeTab: nextProps.tabKey,
      };
    }
    return null;
  }


  render(){
    return (
      <Tabs activeKey={this.state.activeTab} onSelect={k => this.handleSelect(k)}>
      {
        this.state.notes.map((note, index) => { // arrow function
          return (
            <Tab eventKey={index + 1} title={this.state.notes[index].title} className="navigation-tabs">
            </Tab>
          );
        })
      }
      </Tabs>
    );
  }
}



export default NavTabs
