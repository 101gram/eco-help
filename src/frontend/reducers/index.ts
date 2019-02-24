import { combineReducers, Reducer } from 'redux';
import userReducer from '@reducers/user';
import eventsPointsReducer from '@reducers/getAllEventPoints';
import createEventPointReduser from '@reducers/createEventPoint';
import assignToPointReducer  from '@reducers/assignToEventPoint';
import { Action } from '@configs/configureReduxStore';

import { ApplicationStore } from '@configs/configureReduxStore';

type ObjForCombineReducers = { 
    [TKey in keyof ApplicationStore]: Reducer<ApplicationStore[TKey], Action<any>>;
};

const applicationState: ObjForCombineReducers = {
    user: userReducer,
    eventsPoints: eventsPointsReducer,
    createEvent: createEventPointReduser,
    assignToPoint: assignToPointReducer,
};

export default combineReducers(applicationState);