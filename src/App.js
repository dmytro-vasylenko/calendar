import React, {Component} from "react";

import Scale from "./containers/Scale";
import AddEvent from "./components/AddEvent";
import Events from "./components/Events";
import Login from "./components/Login";


class App extends Component {
	render() {
		return (
			<div className="wrapper">
				<Login>
					<Scale />
					<Events />
					<AddEvent />
				</Login>
			</div>
		);
	}
}

export default App;
