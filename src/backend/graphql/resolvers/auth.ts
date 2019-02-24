import * as I from '@modules/interfaces';
import * as Utils from '@modules/utils';
import { User,  } from '@models/user';
import { 
    Resolver,
    Arg,
    Mutation
} from 'type-graphql';
import { LoginRequest  } from '@graphql/types/login-request';
import { LoginResponse } from '@graphql/types/login-response';
import { nullable } from '@modules/flags';
import { RegisterRequest } from '@graphql/types/register-request';


@Resolver()
export class AuthResolver {
   
    @Mutation(_type => LoginResponse, {nullable})
    async login(@Arg('req') credentials: LoginRequest): Promise<I.Maybe<LoginResponse>> {

        const user = await User.findByCredentials(credentials);

        return user && { jwt: user.makeJWT(), user: Utils.docToObjectType(user) };
    }

    @Mutation(_type => LoginResponse)
    async register(@Arg('req') req: RegisterRequest): Promise<LoginResponse> {
        const user = await User.create({ 
            ...req, password: User.encodePassword(req.password)
        });

        return {
            jwt: user.makeJWT(),
            user: Utils.docToObjectType(user)
        };
    }
    
}

