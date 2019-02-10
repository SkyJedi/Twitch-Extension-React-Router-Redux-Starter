import React from 'react'
import {Link} from 'react-router-dom'

export default () => (
	<div>
		<h2>Home</h2>
		<ul>
			<li><Link to="/">Home</Link></li>
			{['config', 'live_config', 'mobile', 'panel', 'video_component', 'video_overlay'].map(type =>
				<li key={type}><Link to={`/${type}.html`}>{type}</Link></li>
			)}
		</ul>
	</div>
);
