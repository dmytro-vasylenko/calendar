import React, {Component} from "react";
import {connect} from "react-redux";

import Event from "../containers/Event";

class Events extends Component {
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
			for(let event of cluster) {
				let canInserted = false;
				let columnPoint;
				for(let column of columns) {
					if(this.canPut(column, event)) {
						canInserted = true;
						columnPoint = column;
						break;
					}
				}
				if(!canInserted) {
					columns.push([event]);
				} else {
					columnPoint.push(event);
				}
			}
			result.push(columns);
		}
		return result;
	}

	canPut(events, newEvent) {
		for(let event of events) {
			if(this.eventsCrossed(event, newEvent)) {
				return false;
			}
		}
		return true;
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

	allShouldMoved(column) {
		for(let item of column) {
			if(!item.shouldMoved) {
				return false;
			}
		}
		return true;
	}

	render() {
		let {events} = this.props;

		if(!events.length) {
			return <div />;
		}

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
				{this.props.events.map((event, index) => <Event {...event} key={index} />)}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	events: state.events
});

export default connect(mapStateToProps)(Events);