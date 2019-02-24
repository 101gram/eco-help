import { 
    EventPointsActions,
    EventPointsStateType,
    defaultPayload
} from '@actions/getAllEventPoints';

const initialState = {
    ...defaultPayload
}; 

export default function eventsPiointsReducer(state = initialState, action: EventPointsActions) {
    const data = action.payload;
    switch (action.type) {
        case EventPointsStateType.Request: {
            return {
                ...state, 
                isFetching: data.isFetching
            };
        }
        case EventPointsStateType.Success: {
            return {
                ...state, 
                eventPoints:  data.eventPoints
            };
        }
        default: {
            return state;
        }
    }
}