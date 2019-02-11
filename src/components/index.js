import React, {Component} from "react";

const asyncComponent = (importComponent) => {
	class AsyncComponent extends Component {
		constructor(props) {
			super(props);
			this.state = {component: null};
		}

		async componentDidMount() {
			const {default: component} = await importComponent();
			this.setState({component: component});
		}

		render() {
			const C = this.state.component;
			return C ? <C {...this.props} /> : null;
		}
	}

	return AsyncComponent;
};

export const App = asyncComponent(() => import('./App'));
export const Config = asyncComponent(() => import('./Config'));
export const Home = asyncComponent(() => import('./Home'));
export const Live_Config = asyncComponent(() => import('./Live_Config'));
export const Mobile = asyncComponent(() => import('./Mobile'));
export const Panel = asyncComponent(() => import('./Panel'));
export const Video_Component = asyncComponent(() => import('./Video_Component'));
export const Video_Overlay = asyncComponent(() => import('./Video_Overlay'));



