import React, {Component} from "react";

class Event extends Component {
	render() {
		let styles = {
			width: this.props.width ? `${this.props.width}%` : "100%",
			height: this.props.duration,
			top: this.props.start,
			left: this.props.left ? `${this.props.left}%` : 0,
		};

		return (
			<div className="event" style={styles}>
				{this.props.title}
			</div>
		);
	}
}

export default Event;