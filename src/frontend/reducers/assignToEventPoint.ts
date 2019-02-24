import { 
    AssignToEventPointActions,
    AssignToEventPointStateType,
    defaultPayload
} from '@actions/assignToEventPoint';

const initialState = {
    ...defaultPayload
}; 

export default function assignTOEventPointReducer(state = initialState, action: AssignToEventPointActions) {
    const data = action.payload;
    switch (action.type) {
        case AssignToEventPointStateType.Request: {
            return {
                ...state, 
                isLoading: data.isLoading
            };
        }
        case AssignToEventPointStateType.Success: {
            return {
                ...state, 
                currentMembers:  data.currentMembers
            };
        }
        default: {
            return state;
        }
    }
}