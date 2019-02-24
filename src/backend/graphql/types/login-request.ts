import { 
    Field,
    InputType
} from 'type-graphql';

import { UserPropLimits, Credentials } from '@models/user';
import { LengthRange    } from '@modules/decorators/length-range';


@InputType()
export class LoginRequest implements Credentials {

    @Field()
    @LengthRange(UserPropLimits.UsernameLength)
    login!: string;

    @Field()
    @LengthRange(UserPropLimits.PasswordLength)
    password!: string;
    
}