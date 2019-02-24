import * as I from '@common/interfaces';
import { client } from '@configs/ApolloClient';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { GetAllEventPoints } from '@graphql/generated';

export type EventPoint = GetAllEventPoints.GetAllEventPoints;

export enum EventPointsStateType {
    Request = 'GET_EVENT_POINTS_REQUEST',
    Error   = 'GET_EVENT_POINTS_ERROR'  ,
    Success = 'GET_EVENT_POINTS_SUCCESS',
} 
  
export interface EventPointsState {
    isFetching:   boolean;
    eventPoints?: I.Maybe<EventPoint[]>;
}

export const defaultPayload: EventPointsState = {
    isFetching: false,
    eventPoints: null
};

export interface EventPointsActions {
    type:    EventPointsStateType;
    payload: EventPointsState;
}

type EventPointsResult<TResult> = ThunkAction<TResult, EventPointsState, undefined, EventPointsActions>;

export type EventPointsThunkDispatch = ThunkDispatch<EventPointsState, undefined, EventPointsActions>;

export function getAllEventPoints(): EventPointsResult<void> {
    return async dispatch => {
        dispatch({ 
            type: EventPointsStateType.Request,
            payload: { isFetching: true, eventPoints: null }
        });
        try {
            const response = await client
                .query<GetAllEventPoints.Query, GetAllEventPoints.Variables>({
                    query: GetAllEventPoints.Document
                });
            debugger;
            if (response.errors) {
                throw new Error(response.errors.toString());
            }
            dispatch({
                type: EventPointsStateType.Success, 
                payload: { 
                    isFetching: false,
                    eventPoints: response.data.getAllEventPoints
                }
            });
        } catch(_err) {
            debugger;
            dispatch({ type: EventPointsStateType.Error, payload: { 
                isFetching: false, eventPoints: null
            }});
        }
    };
}