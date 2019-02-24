import * as I from '@common/interfaces';
import { client } from '@configs/ApolloClient';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { CreateEventPoint, CreateEventPointRequest } from '@graphql/generated';

export type EventPoint = CreateEventPoint.CreateEventPoint;
export { CreateEventPointRequest }; 

export enum CreateEventPointStateType {
    Request = 'CREATE_EVENT_POINT_REQUEST',
    Error   = 'CREATE_EVENT_POINT_ERROR'  ,
    Success = 'CREATE_EVENT_POINT_SUCCESS',
} 

export const defaultPayload: CreateEventPointState = {
    isLoading: false,
    createdEventPoint: null
};

  
export interface CreateEventPointState {
    isLoading:          boolean;
    createdEventPoint?: I.Maybe<EventPoint>;
}

export interface CreateEventPointActions {
    type:    CreateEventPointStateType;
    payload: CreateEventPointState;
}

type CreateEventPointResult<TResult> = ThunkAction<
    TResult, CreateEventPointState, void, CreateEventPointActions
>;

export type CreateEventPointThunkDispatch = ThunkDispatch<
    CreateEventPointState, void, CreateEventPointActions
>;

export function createEventPoint(req: CreateEventPointRequest): CreateEventPointResult<void> {
    return async dispatch => {
        dispatch({ 
            type: CreateEventPointStateType.Request,
            payload: { isLoading: true, createdEventPoint: null }
        });
        try {
            const response = await client
                .mutate<CreateEventPoint.Mutation, CreateEventPoint.Variables>({
                    variables: { req },
                    mutation: CreateEventPoint.Document
                });
            if (response.errors) {
                throw new Error;
            }
            dispatch({
                type: CreateEventPointStateType.Success, 
                payload: { 
                    isLoading: false,
                    createdEventPoint: response.data!.createEventPoint
                }
            });
        } catch(_err) {
            dispatch({ 
                type: CreateEventPointStateType.Error, 
                payload: { isLoading: false, createdEventPoint: null }
            });
        }
    };
}