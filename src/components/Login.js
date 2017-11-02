import React, {Component} from "react";
import axios from "axios";
import {connect} from "react-redux";

import {addEvents} from "../actions";
import {api} from "../config";

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: "",
			password: "",
			loginCorrect: false
		};
	}

	async componentWillMount() {
		if(localStorage.getItem("user") && localStorage.getItem("password")) {
			let response = await axios.get(`${api}/calendar`, {
				params: {
					user: localStorage.getItem("user"),
					password: localStorage.getItem("password")
				}
			});
			if(response.data !== "Invalid login or password") {
				this.setState({loginCorrect: true});
				this.props.setEvents(response.data);
			} else {
				localStorage.clear("user");
				localStorage.clear("password");
			}
		}
	}

	handleChange(prop, input) {
		this.setState({[prop]: input.target.value});
	}

	async handleLogin() {
		let response = await axios.get(`${api}/calendar/${this.state.user}/${this.state.password}`);
		if(response.data !== "Invalid login or password") {
			localStorage.setItem("user", this.state.user);
			localStorage.setItem("password", this.state.password);
			this.setState({loginCorrect: true});
			this.props.setEvents(response.data);
		} else {
			alert("Invalid login or password");
		}
		console.log(response);
	}

	render() {
		if(this.state.loginCorrect) {
			return this.props.children;
		}

		return (
			<div className="login-form">
				<input type="text" placeholder="Login" onChange={input => this.handleChange("user", input)} />
				<input type="password" placeholder="Password" onChange={input => this.handleChange("password", input)} />
				<button onClick={this.handleLogin.bind(this)}>Log in</button>
			</div>
		);
	}
};

const mapDispatchToProps = dispatch => ({
	setEvents: events => dispatch(addEvents(events))
});

export default connect(null, mapDispatchToProps)(Login);