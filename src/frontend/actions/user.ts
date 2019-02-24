import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import * as I from '@common/interfaces';
import { LoginUser, RegisterUser } from '@graphql/generated';
import { client } from '@configs/ApolloClient';

export enum UserStateType {
    AuthRequest = 'USER_AUTHENTIFICATE_REQUEST',
    AuthError   = 'USER_AUTHENTIFICATE_ERROR'  ,
    AuthSuccess = 'USER_AUTHENTIFICATE_SUCCESS',
    RegisterRequest = 'USER_REGISTER_REQUEST',
    RegisterError = 'USER_REGISTER_ERROR',
    RegisterSuccess = 'USER_REGISTER_SUCCESS',
    Logout = 'USER_LOGOUT'
}
  
export interface UserState {
    isFetching: boolean;
    token: string;
    currentUser?: I.Maybe<LoginUser.User>;
}

export const defaultPayload: UserState = {
    isFetching: false,
    token: "",
    currentUser: null
};

export interface UserActions {
    type: UserStateType;
    payload: UserState;
}

type UserResult<TResult> = ThunkAction<TResult, UserState, undefined, UserActions>;

export type UserThunkDispatch = ThunkDispatch<UserState, undefined, UserActions>;

export function authenticate(login: string, password: string): UserResult<void> {
    return async dispatch => {
        dispatch({ 
            type: UserStateType.AuthRequest,
            payload: { ...defaultPayload, isFetching: true }
        });
        let result;
        try {
            const response = await client.mutate<LoginUser.Mutation, LoginUser.Variables>({
                variables: {
                    req: {
                        login,
                        password
                    }
                },
                mutation: LoginUser.Document
            });
            if (response.errors) {
                throw new Error(response.errors.toString());
            }
            result = response.data;
        } catch(e) {
            dispatch({ type: UserStateType.AuthError, payload: { 
                ...defaultPayload,
            }});
            return;
        }
        if (!result!.login!.user) {
            dispatch({ type: UserStateType.AuthError, payload: { 
                ...defaultPayload,
            }});
            return;
        }
        console.log(
            {
                type: UserStateType.AuthSuccess,
                payload: {
                    ...defaultPayload,
                    currentUser: result!.login!.user,
                    token: result!.login!.jwt
                }
            }
        );
        dispatch({
            type: UserStateType.AuthSuccess,
            payload: {
                ...defaultPayload,
                currentUser: result!.login!.user,
                token: result!.login!.jwt
            }
        });
    };
}

export function register(login: string, password: string, fullname: string ): UserResult<void> {
    return async dispatch => {
        dispatch({ 
            type: UserStateType.RegisterRequest,
            payload: { ...defaultPayload, isFetching: true }
        });
        let result;
        try {
            const response = await client.mutate<RegisterUser.Mutation, RegisterUser.Variables>({
                variables: {
                    req: {
                        login,
                        password,
                        fullname,
                        targetArea: {
                            center: {
                                lat: 40,
                                lon: 50,
                            },
                            radius: 200,
                        }
                    }
                },
                mutation: RegisterUser.Document
            });
            if (response.errors) {
                throw new Error(response.errors.toString());
            }
            result = response.data;
        } catch(e) {
            dispatch({ type: UserStateType.RegisterError, payload: { 
                ...defaultPayload,
            }});
            return;
        }
        if (!result!.register.user) {
            dispatch({ type: UserStateType.RegisterError, payload: { 
                ...defaultPayload,
            }});
            return;
        }
        dispatch({ 
            type: UserStateType.RegisterSuccess, 
            payload: { 
                ...defaultPayload,
                currentUser: result!.register.user,
                token: result!.register.jwt
            }
        });
    };
}

export function logout(): UserResult<void> {
    return async dispatch => {
        dispatch({ 
            type: UserStateType.Logout,
            payload: { ...defaultPayload }
        });
    };
}