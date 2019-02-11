import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {setProps} from '../redux/actions';
import {Config, Home, Live_Config, Mobile, Panel, Video_Component, Video_Overlay} from './index';

class App extends React.Component {
	twitch = window.Twitch ? window.Twitch.ext : null;
	state = {isVisible: true, isAuth: false, theme: 'light'};

	//changes the theme from light to dark
	contextUpdate = (context, delta) => {
		if (delta.includes('theme')) {
			this.setState({theme: context.theme});
		}
	};

	componentDidMount() {
		if (this.twitch) {

			//Authorize the user
			this.twitch.onAuthorized(() => this.setState({isAuth: true}));

			//listener for pubsub events
			this.twitch.listen('broadcast', (target, contentType, body) => {
				const {...data} = this.props.state;
				this.twitch.configuration.set('broadcaster', '', JSON.stringify(data));
				this.props.setProps({...JSON.parse(body)});
			});

			//hide extension when user changes visibility
			this.twitch.onVisibilityChanged((isVisible) => this.setState({isVisible}));

			//function to detect onContext changes, including theme changes
			this.twitch.onContext((context, delta) => this.contextUpdate(context, delta));

			//function to listen to configuration changes and sets state.content
			//This function should be replaced with an EBS for production
			this.twitch.configuration.onChanged(() => {
				if (this.twitch.configuration.broadcaster) {
					const {content} = this.twitch.configuration.broadcaster,
						data = JSON.parse(content);
					if (typeof data === 'object') {
						Object.keys(data).forEach(key => this.props.setProps({[key]: data[key]}));
					}

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
		const {theme, isAuth, isVisible} = this.state;

		//show empty <div>when invisible
		if (!isVisible) return <div/>;

		//show loading when user is being authenticated
		if (!isAuth) return <div>Loading...</div>;

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
		state: state,
	};
};

const matchDispatchToProps = dispatch => bindActionCreators({setProps}, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(App);