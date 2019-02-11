import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setProps} from '../redux/actions';

class Live_Config extends React.Component {

	twitch = window.Twitch ? window.Twitch.ext : null;
	state = {isAuth: false};

	componentDidMount() {
		if (this.twitch) {
			//Authorize the user
			this.twitch.onAuthorized(() => this.setState({isAuth: true}));
		} else console.log('Twitch helper not loading!');
	};

	handleClick = () => {
		const {content} = this.props;
		this.twitch.send('broadcast', 'application/json', {content: !content ? 'You can haz Taco!' : false});
	};

	render() {
		if (!this.state.isAuth) return <div>Loading...</div>;
		return (
			<div>
				<h2>You're on the Live_Config page!</h2>
				<button onClick={this.handleClick}>Give/Remove Taco</button>
				<h3>The users {this.props.content ? 'haz' : 'no haz'} Taco</h3>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		content: state.content,
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({setProps}, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(Live_Config);
