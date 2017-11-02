import {ADD_EVENT, ADD_EVENTS, DELETE_EVENT} from "../constants";

const initialState = {
	events: []
};

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case ADD_EVENTS:
			let newEvents = [...state.events];
			for(let event of action.payload) {
				newEvents.push({
					title: event.title,
					start: parseInt(event.start),
					duration: parseInt(event.duration)
				});
			}
			newEvents.sort((a, b) => a.start - b.start);
			return {events: newEvents};
		case ADD_EVENT:
			return {events: [...state.events, action.payload].sort((a, b) => a.start - b.start)};
		case DELETE_EVENT:
			const {title, start, duration} = action.payload;
			newEvents = state.events.filter(item => item.title !== title || item.start !== start || item.duration !== duration)
			for(let event of newEvents) {
				event.left = 0;
				event.width = 0;
			}
			return {events: newEvents};
		default:
			return state;
	}
};

export default reducer;