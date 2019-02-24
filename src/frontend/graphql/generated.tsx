export type Maybe<T> = T | null;

export interface UpdateMeRequest {
  targetArea?: Maybe<UpdateCircleRequest>;

  avaUrl?: Maybe<string>;

  fullname?: Maybe<string>;

  tgName?: Maybe<string>;
}

export interface UpdateCircleRequest {
  center: UpdateGeoPointRequest;

  radius: number;
}

export interface UpdateGeoPointRequest {
  lat: number;

  lon: number;
}

export interface LoginRequest {
  login: string;

  password: string;
}

export interface RegisterRequest {
  targetArea: CreateCircleRequest;

  fullname: string;

  login: string;

  password: string;
}

export interface CreateCircleRequest {
  center: CreateGeoPointRequest;

  radius: number;
}

export interface CreateGeoPointRequest {
  lat: number;

  lon: number;
}

export interface CreateEventPointRequest {

  location: CreateGeoPointRequest;

  description: string;

  budget?: Maybe<number>;

  expectedMembers: number;

  startDate: string;
}

export interface UpdateEventPointRequest {
  id: string;

  location: UpdateGeoPointRequest;

  description: string;

  budget?: Maybe<number>;

  expectedMembers: number;

  startDate: string;

  photoUrl: string;
}
/** Identifies user access level */
export enum UserRole {
  Admin = "Admin",
  Guest = "Guest",
  Regular = "Regular"
}

/** Bson ObjectId unique identifier (hexadecimal string). */
export type ObjectId = string;

/** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
export type DateTime = string;

// ====================================================
// Documents
// ====================================================

export namespace RegisterUser {
  export type Variables = {
    req: RegisterRequest;
  };

  export type Mutation = {
    __typename?: "Mutation";

    register: Register;
  };

  export type Register = {
    __typename?: "LoginResponse";

    jwt: string;

    user: User;
  };

  export type User = {
    __typename?: "User";

    id: string;

    role: UserRole;

    login: string;

    registrationDate: string;

    fullname: string;

    targetArea: TargetArea;

    avaUrl: Maybe<string>;

    tgChatId: Maybe<string>;

    tgName: Maybe<string>;

    assignedEvents: string[];
  };

  export type TargetArea = {
    __typename?: "Circle";

    center: Center;

    radius: number;
  };

  export type Center = {
    __typename?: "GeoPoint";

    lon: number;

    lat: number;
  };
}

export namespace GetAllEventPoints {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    getAllEventPoints: GetAllEventPoints[];
  };

  export type GetAllEventPoints = {
    __typename?: "EventPoint";

    id: string;

    description: string;

    currentMembers: number;

    creator: Creator;

    expectedMembers: number;

    startDate: string;

    location: Location;
  };

  export type Creator = {
    __typename?: "User";

    fullname: string;
  };

  export type Location = {
    __typename?: "GeoPoint";

    lat: number;

    lon: number;
  };
}

export namespace LoginUser {
  export type Variables = {
    req: LoginRequest;
  };

  export type Mutation = {
    __typename?: "Mutation";

    login: Maybe<Login>;
  };

  export type Login = {
    __typename?: "LoginResponse";

    jwt: string;

    user: User;
  };

  export type User = {
    __typename?: "User";

    id: string;

    role: UserRole;

    login: string;

    registrationDate: string;

    fullname: string;

    targetArea: TargetArea;

    avaUrl: Maybe<string>;

    tgChatId: Maybe<string>;

    tgName: Maybe<string>;

    assignedEvents: string[];
  };

  export type TargetArea = {
    __typename?: "Circle";

    center: Center;

    radius: number;
  };

  export type Center = {
    __typename?: "GeoPoint";

    lon: number;

    lat: number;
  };
}

export namespace CreateEventPoint {
  export type Variables = {
    req: CreateEventPointRequest;
  };

  export type Mutation = {
    __typename?: "Mutation";

    createEventPoint: CreateEventPoint;
  };

  export type CreateEventPoint = {
    __typename?: "EventPoint";

    id: string;

    description: string;

    currentMembers: number;

    creator: Creator;

    expectedMembers: number;

    startDate: string;

    location: Location;
  };

  export type Creator = {
    __typename?: "User";

    fullname: string;
  };

  export type Location = {
    __typename?: "GeoPoint";

    lat: number;

    lon: number;
  };
}

export namespace AssignToEventPoint {
  export type Variables = {
    id: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    assignEventPoint: AssignEventPoint;
  };

  export type AssignEventPoint = {
    __typename?: "EventPoint";

    currentMembers: number;
  };
}

import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

// ====================================================
// Components
// ====================================================

export namespace RegisterUser {
  export const Document = gql`
    mutation registerUser($req: RegisterRequest!) {
      register(req: $req) {
        jwt
        user {
          id
          role
          login
          registrationDate
          fullname
          targetArea {
            center {
              lon
              lat
            }
            radius
          }
          avaUrl
          tgChatId
          tgName
          assignedEvents
        }
      }
    }
  `;
  export class Component extends React.Component<
    Partial<ReactApollo.MutationProps<Mutation, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Mutation<Mutation, Variables>
          mutation={Document}
          {...(this as any)["props"] as any}
        />
      );
    }
  }
  export type Props<TChildProps = any> = Partial<
    ReactApollo.MutateProps<Mutation, Variables>
  > &
    TChildProps;
  export type MutationFn = ReactApollo.MutationFn<Mutation, Variables>;
  export function HOC<TProps, TChildProps = any>(
    operationOptions:
      | ReactApollo.OperationOption<
          TProps,
          Mutation,
          Variables,
          Props<TChildProps>
        >
      | undefined
  ) {
    return ReactApollo.graphql<TProps, Mutation, Variables, Props<TChildProps>>(
      Document,
      operationOptions
    );
  }
}
export namespace GetAllEventPoints {
  export const Document = gql`
    query getAllEventPoints {
      getAllEventPoints {
        id
        description
        currentMembers
        creator {
          fullname
        }
        expectedMembers
        startDate
        location {
          lat
          lon
        }
      }
    }
  `;
  export class Component extends React.Component<
    Partial<ReactApollo.QueryProps<Query, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Query<Query, Variables>
          query={Document}
          {...(this as any)["props"] as any}
        />
      );
    }
  }
  export type Props<TChildProps = any> = Partial<
    ReactApollo.DataProps<Query, Variables>
  > &
    TChildProps;
  export function HOC<TProps, TChildProps = any>(
    operationOptions:
      | ReactApollo.OperationOption<
          TProps,
          Query,
          Variables,
          Props<TChildProps>
        >
      | undefined
  ) {
    return ReactApollo.graphql<TProps, Query, Variables, Props<TChildProps>>(
      Document,
      operationOptions
    );
  }
}
export namespace LoginUser {
  export const Document = gql`
    mutation loginUser($req: LoginRequest!) {
      login(req: $req) {
        jwt
        user {
          id
          role
          login
          registrationDate
          fullname
          targetArea {
            center {
              lon
              lat
            }
            radius
          }
          avaUrl
          tgChatId
          tgName
          assignedEvents
        }
      }
    }
  `;
  export class Component extends React.Component<
    Partial<ReactApollo.MutationProps<Mutation, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Mutation<Mutation, Variables>
          mutation={Document}
          {...(this as any)["props"] as any}
        />
      );
    }
  }
  export type Props<TChildProps = any> = Partial<
    ReactApollo.MutateProps<Mutation, Variables>
  > &
    TChildProps;
  export type MutationFn = ReactApollo.MutationFn<Mutation, Variables>;
  export function HOC<TProps, TChildProps = any>(
    operationOptions:
      | ReactApollo.OperationOption<
          TProps,
          Mutation,
          Variables,
          Props<TChildProps>
        >
      | undefined
  ) {
    return ReactApollo.graphql<TProps, Mutation, Variables, Props<TChildProps>>(
      Document,
      operationOptions
    );
  }
}
export namespace CreateEventPoint {
  export const Document = gql`
    mutation createEventPoint($req: CreateEventPointRequest!) {
      createEventPoint(req: $req) {
        id
        description
        currentMembers
        creator {
          fullname
        }
        expectedMembers
        startDate
        location {
          lat
          lon
        }
      }
    }
  `;
  export class Component extends React.Component<
    Partial<ReactApollo.MutationProps<Mutation, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Mutation<Mutation, Variables>
          mutation={Document}
          {...(this as any)["props"] as any}
        />
      );
    }
  }
  export type Props<TChildProps = any> = Partial<
    ReactApollo.MutateProps<Mutation, Variables>
  > &
    TChildProps;
  export type MutationFn = ReactApollo.MutationFn<Mutation, Variables>;
  export function HOC<TProps, TChildProps = any>(
    operationOptions:
      | ReactApollo.OperationOption<
          TProps,
          Mutation,
          Variables,
          Props<TChildProps>
        >
      | undefined
  ) {
    return ReactApollo.graphql<TProps, Mutation, Variables, Props<TChildProps>>(
      Document,
      operationOptions
    );
  }
}
export namespace AssignToEventPoint {
  export const Document = gql`
    mutation assignToEventPoint($id: ObjectId!) {
      assignEventPoint(id: $id) {
        currentMembers
      }
    }
  `;
  export class Component extends React.Component<
    Partial<ReactApollo.MutationProps<Mutation, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Mutation<Mutation, Variables>
          mutation={Document}
          {...(this as any)["props"] as any}
        />
      );
    }
  }
  export type Props<TChildProps = any> = Partial<
    ReactApollo.MutateProps<Mutation, Variables>
  > &
    TChildProps;
  export type MutationFn = ReactApollo.MutationFn<Mutation, Variables>;
  export function HOC<TProps, TChildProps = any>(
    operationOptions:
      | ReactApollo.OperationOption<
          TProps,
          Mutation,
          Variables,
          Props<TChildProps>
        >
      | undefined
  ) {
    return ReactApollo.graphql<TProps, Mutation, Variables, Props<TChildProps>>(
      Document,
      operationOptions
    );
  }
}
