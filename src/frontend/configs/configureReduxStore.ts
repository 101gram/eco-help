import { createStore, applyMiddleware, compose, Action as ActionCommon } from 'redux';
import { UserState } from '@actions/user';
import { EventPointsState } from '@actions/getAllEventPoints';
import { CreateEventPointState } from '@actions/createEventPoint';
import { AssignToEventPointState } from '@actions/assignToEventPoint';
import rootReducer from '@reducers/index';
import thunk from 'redux-thunk';

// DELETE ON PROD
const composeEnhancers = (
        window as any
    ).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const enhancer = composeEnhancers(
    applyMiddleware(thunk),
);

export interface Action<T = unknown> extends ActionCommon  {
    payload: T;
}

export interface ApplicationStore {
    user: UserState;
    eventsPoints: EventPointsState;
    createEvent: CreateEventPointState;
    assignToPoint: AssignToEventPointState;
}

export default createStore(rootReducer, enhancer);