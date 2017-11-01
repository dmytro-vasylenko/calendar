import React, {Component} from "react";

const MIN_HOUR = 8;
const MAX_HOUR = 5;

class Scale extends Component {
	render() {
		let scale = [];
		for(let i = MIN_HOUR - 1; i < MAX_HOUR + 12; i++) {
			scale.push(
				<div className="hour" key={i}>
					<div className="line" />
					<div className="mark">
						<div className="large">{i % 12 + 1}:00</div>
						{i !== MAX_HOUR + 11 && <div className="small">{i % 12 + 1}:30</div>}
					</div>
				</div>
			);
		}
		return (
			<div className="scale">{scale}</div>
		);
	}
}

export default Scale;