import * as I from '@common/interfaces';
import { client } from '@configs/ApolloClient';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AssignToEventPoint } from '@graphql/generated';


export enum AssignToEventPointStateType {
    Request = 'ASSIGN_TO_EVENT_POINT_REQUEST',
    Error   = 'ASSIGN_TO_EVENT_POINT_ERROR'  ,
    Success = 'ASSIGN_TO_EVENT_POINT_SUCCESS',
} 
  
export interface AssignToEventPointState {
    isLoading:       boolean;
    currentMembers?: I.Maybe<number>;
}

export interface AssignToEventPointActions {
    type:    AssignToEventPointStateType;
    payload: AssignToEventPointState;
}

type AssignToEventPointResult<TResult> = ThunkAction<
    TResult, AssignToEventPointState, void, AssignToEventPointActions
>;

export type AssignToEventPointThunkDispatch = ThunkDispatch<
    AssignToEventPointState, void, AssignToEventPointActions
>;

export const defaultPayload: AssignToEventPointState = {
    isLoading: false,
    currentMembers: null
};

export function assignToEventPoint(id: string): AssignToEventPointResult<void> {
    return async dispatch => {
        dispatch({ 
            type: AssignToEventPointStateType.Request,
            payload: { isLoading: true, currentMembers: null }
        });
        try {
            const response = await client
                .mutate<AssignToEventPoint.Mutation, AssignToEventPoint.Variables>({
                    variables: { id },
                    mutation: AssignToEventPoint.Document
                });
            if (response.errors) {
                throw new Error;
            }
            dispatch({
                type: AssignToEventPointStateType.Success, 
                payload: { 
                    isLoading: false,
                    currentMembers: response.data!.assignEventPoint.currentMembers
                }
            });
        } catch(_err) {
            dispatch({ 
                type: AssignToEventPointStateType.Error, 
                payload: { isLoading: false, currentMembers: null }
            });
        }
    };
}