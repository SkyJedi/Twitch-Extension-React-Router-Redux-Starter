import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setProps} from '../actions/index';

class Panel extends React.Component {

	render() {
		return (
			<div>
				<h2>You're on the Panel page!</h2>
				<h3>{this.props.content}</h3>
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

export default connect(mapStateToProps, matchDispatchToProps)(Panel);
