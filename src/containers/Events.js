import React, {Component} from "react";

import Event from "../components/Event";

class Events extends Component {
	constructor(props) {
		super(props);

		this.state = {
			events: [
				{start: 0, duration: 1500, title: "Exercise"},
				{start: 25, duration: 30, title: "Travel to work"},
				{start: 30, duration: 30, title: "Push up branch"},
				{start: 60, duration: 15, title: "Plan day"},
				{start: 100, duration: 15, title: "Review yestarday's commits"},
				{start: 180, duration: 90, title: "Code review"},
				{start: 360, duration: 30, title: "Have lunch with John"},
				// {start: 370, duration: 45, title: "Skype call"},
				{start: 380, duration: 20, title: "Follow up with designer"}
			]
		};
	}

	devideEvents(events) {
		let separate = events[0].isCrossed;
		let clusters = [];
		let index = 0;
		for(let event of events) {
			if(!event.isCrossed) {
				clusters.push([event]);
				index += 2;
				separate = true;
				continue;
			}
			if(separate && !event.isCrossed) {
				index++;
				separate = false;
			} else if(event.isCrossed) {
			}
			if(separate) {
				if(!clusters[index]) {
					clusters[index] = [];
				}
				clusters[index].push(event);
			}
		}
		return clusters;
	}

	positionItemsClusters(clusters) {
		var result = [];
		for(let cluster of clusters) {
			if(!cluster) {
				continue;
			}
			let columns = [];
			for(let item of cluster) {
				let inserted = false;
				for(let i = 0; i < columns.length; i++) {
					if(inserted) {
						break;
					}
					for(let j = 0; j < columns[i].length; j++) {
						if(!this.eventsCrossed(item, columns[i][j])) {
							columns[i].push(item);
							inserted = true;
							break;
						}
					}
				}
				if(!inserted) {
					columns.push([item]);
				}
			}
			result.push(columns);
		}
		return result;
	}

	eventsCrossed(eventA, eventB) {
		if(eventA.start > eventB.start) {
			return this.eventsCrossed(eventB, eventA);
		}
		if(eventA.start + eventA.duration > eventB.start) {
			return true;
		}
		return false;
	}

	setPosition(eventGroups) {
		for(let eventGroup of eventGroups) {
			if(eventGroup.length === 1) {
				continue;
			}
			for(let i = 0; i < eventGroup.length; i++) {
				let column = eventGroup[i];
				for(let event of column) {
					event.width = 100/eventGroup.length;
					event.left = 100/eventGroup.length*i;
				}
			}
		}
	}

	render() {
		let {events} = this.state;

		for(let eventA of events) {
			for(let eventB of events) {
				if(eventA === eventB) {
					continue;
				}

				if(this.eventsCrossed(eventA, eventB)) {
					eventA.isCrossed = true;
				}
			}
		}

		const clusters = this.devideEvents(events);
		const result = this.positionItemsClusters(clusters);
		this.setPosition(result);

		return (
			<div className="events">
				{this.state.events.map((event, index) => <Event {...event} key={index} />)}
			</div>
		);
	}
}

export default Events;