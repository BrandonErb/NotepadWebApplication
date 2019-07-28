import React, { Component } from 'react'
import {Tab, Tabs} from 'react-bootstrap'
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

class NavTabs extends Component {
  constructor(props) {
    super(props);
     // Takes active tab from props if it is defined there
    this.state = {
      activeTab: props.tabKey,
      labels: props.tabLabels
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
    if (nextProps.tabLabels !== prevState.tabLabels) {
      return {
        labels: nextProps.tabLabels,
      };
    }
    // Return null if the state hasn't changed
    return null;
  }


  render(){
    return (
      <Tabs activeKey={this.state.activeTab} onSelect={this.handleSelect} id="nav-tabs" >
        <Tab eventKey={1} title="Tab 1">
          Tab 1
        </Tab>
        <Tab eventKey={2} title="Tab 2">
          Tab 2
        </Tab>
        <Tab eventKey={3} title={this.state.labels} disabled>
          Tab 3
        </Tab>
      </Tabs>
    );
  }
}

export default NavTabs
