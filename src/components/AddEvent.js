import React, {Component} from "react";
import axios from "axios";
import {connect} from "react-redux";

import {api} from "../config";
import {addEvent} from "../actions";

class AddEvent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: false,
			title: "",
			start: "",
			duration: ""
		};
	}

	handleClick() {
		this.setState(state => ({isOpen: !state.isOpen}));
	}

	async handleAddEvent() {
		const {title, start, duration} = this.state;
		if(!title || !start || !duration) {
			alert("Please, fill out all fields");
			return;
		}
		let response = await axios.post(`${api}/event`, {
			user: localStorage.getItem("user"),
			password: localStorage.getItem("password"),
			event: {title, start, duration}
		});
		if(response.data !== "OK") {
			alert("Start and duration must be numeric");
		} else {
			this.setState({isOpen: false});
			this.props.addNewEvent({
				start: parseInt(start),
				duration: parseInt(duration),
				title
			});
		}
	}

	handleChange(prop, input) {
		console.log(prop, input.target.value);
		this.setState({[prop]: input.target.value});
	}

	render() {
		return (
			<div className="add-event">
				<button onClick={this.handleClick.bind(this)}>Add event</button>
				<div className={this.state.isOpen ? "add-event-form" : "hidden-block"}>
					<input type="text" placeholder="Title" onChange={input => this.handleChange("title", input)}/>
					<input type="text" placeholder="Start" onChange={input => this.handleChange("start", input)}/>
					<input type="text" placeholder="Duration" onChange={input => this.handleChange("duration", input)}/>
					<button onClick={this.handleAddEvent.bind(this)}>Add new event</button>
				</div>
			</div>
		);
	}
}

const mapDispatchToState = dispatch => ({
	addNewEvent: event => dispatch(addEvent(event))
});

export default connect(null, mapDispatchToState)(AddEvent);