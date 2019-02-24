import { 
    Field,
    ObjectType
} from 'type-graphql';

import { UserType } from '@models/user';


@ObjectType()
export class LoginResponse {
    @Field()
    jwt!: string;

    @Field()
    user!: UserType;
}
