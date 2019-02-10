import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setProps} from '../actions/index';

class Video_Overlay extends React.Component {

	render() {
		const {data} = this.props;
		return (
			<div>
				<h2>Video_Overlaye</h2>
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

export default connect(mapStateToProps, matchDispatchToProps)(Video_Overlay);
