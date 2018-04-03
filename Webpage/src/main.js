const React = require('react');
const ReactDOM = require('react-dom');

const url = 'ec2-54-204-0-88.compute-1.amazonaws.com';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {noteID: [], notes: []};
	}

	componentDidMount() {
		client({method: 'GET', path: url + '/notes/note'}).done(response => {
			this.setState({notes: response.entity._embedded.notes});
		});
	}

	render() {
		return (
      <div>
        <{this.state.noteID}/>
      </div>
      <div>
        <{this.state.notes}/>
      </div>
		)
	}
}
