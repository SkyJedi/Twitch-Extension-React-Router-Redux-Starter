import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setProps} from '../actions/index';

class Mobile extends React.Component {

	render() {
		return (
			<div>
				<h2>You're on the Mobile page!</h2>
				<h3>{this.props.text}</h3>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		content: state.content,
		text: state.text
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({setProps}, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(Mobile);
