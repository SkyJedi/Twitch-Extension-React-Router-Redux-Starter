import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {setProps} from '../actions';
import {Config, Home, Live_Config, Mobile, Panel, Video_Component, Video_Overlay} from './index';

class App extends React.Component {
	twitch = window.Twitch ? window.Twitch.ext : null;
	state = {isVisible: true, isAuth: false};

	//changes the theme from light to dark
	contextUpdate = (context, delta) => {
		if (delta.includes('theme')) {
			this.props.setProps({theme: context.theme});
		}
	};

	componentDidMount() {
		if (this.twitch) {

			//Authorize the user
			this.twitch.onAuthorized(() => this.setState({isAuth: true}));

			//listener for pubsub events
			this.twitch.listen('broadcast', (target, contentType, body) => {
				/*const data = JSON.parse(body);
				this.setState({data});*/
			});

			//hide extension when user changes visibility
			this.twitch.onVisibilityChanged((isVisible) => this.setState({isVisible}));

			//function to detect onContext changes, including theme changes
			this.twitch.onContext((context, delta) => this.contextUpdate(context, delta));

			//function to listen to configuration changes and sets state.content
			this.twitch.configuration.onChanged(() => {
				if (this.twitch.configuration.broadcaster) {
					const {content} = this.twitch.configuration.broadcaster;
					this.props.setProps({content: JSON.parse(content)});
				}
			});
		} else console.log('Twitch helper not loading!');
	};

	componentWillUnmount() {
		if (this.twitch) {
			this.twitch.unlisten('broadcast', () => console.log('successfully unlistened'))
		}
	};

	render() {
		const {theme} = this.props;

		//show empty <div>when invisible
		if (!this.state.isVisible) return <div/>;

		//show loading when user is being authenticated
		if (!this.state.isAuth) return <div>Loading...</div>;

		//display the router
		return <Router>
			<div className={`App App-${theme}`}>
				<Route exact path="/" component={Home}/>
				<Route path={`/config.html`} component={Config}/>
				<Route path={`/live_config.html`} component={Live_Config}/>
				<Route path={`/mobile.html`} component={Mobile}/>
				<Route path={`/panel.html`} component={Panel}/>
				<Route path={`/video_component.html`} component={Video_Component}/>
				<Route path={`/video_overlay.html`} component={Video_Overlay}/>
			</div>
		</Router>
	}
}

const mapStateToProps = state => {
	return {
		theme: state.theme
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({setProps}, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(App);