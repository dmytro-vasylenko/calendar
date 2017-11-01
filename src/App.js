import React, {Component} from "react";

import Scale from "./containers/Scale";
import Events from "./containers/Events";

class App extends Component {
	render() {
		return (
			<div className="wrapper">
				<Scale />
				<Events />
			</div>
		);
	}
}

export default App;
