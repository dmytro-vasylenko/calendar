import React, {Component} from "react";
import {connect} from "react-redux";
import axios from "axios";

import {deleteEvent} from "../actions/";
import {api} from "../config";

class Event extends Component {
	handleDelete() {
		const {title, start, duration} = this.props;
		this.props.deleteEvent({title, start, duration});
		axios.delete(`${api}/event`, {
			data: {
				user: localStorage.getItem("user"),
				password: localStorage.getItem("password"),
				event: {title, start, duration}
			}
		});
	}

	render() {
		let styles = {
			width: this.props.width ? `${this.props.width}%` : "100%",
			height: this.props.duration,
			top: this.props.start,
			left: this.props.left ? `${this.props.left}%` : 0,
			backgroundColor: this.props.color && this.props.color
		};

		return (
			<div className="event" style={styles} onDoubleClick={this.handleDelete.bind(this)}>
				{this.props.title}
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	deleteEvent: event => dispatch(deleteEvent(event))
});

export default connect(null, mapDispatchToProps)(Event);