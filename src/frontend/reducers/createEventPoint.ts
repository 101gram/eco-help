import { 
    CreateEventPointActions,
    CreateEventPointStateType,
    defaultPayload
} from '@actions/createEventPoint';

const initialState = {
    ...defaultPayload
}; 

export default function eventsPiointsReducer(state = initialState, action: CreateEventPointActions) {
    const data = action.payload;
    switch (action.type) {
        case CreateEventPointStateType.Request: {
            return {
                ...state, 
                isLoadig: data.isLoading
            };
        }
        case CreateEventPointStateType.Success: {
            return {
                ...state, 
                createdEventPoint:  data.createdEventPoint
            };
        }
        default: {
            return state;
        }
    }
}