import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setProps} from '../actions/index';

class Panel extends React.Component {

	render() {
		const {data} = this.props;
		return (
			<div>
				<h2>Panel</h2>
				<h2>{data}</h2>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		data: state.data,
		theme: state.theme
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({setProps}, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(Panel);
