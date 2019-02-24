import { 
    Field,
    InputType
} from 'type-graphql';

import { UserPropLimits, Credentials } from '@models/user';
import { LengthRange    } from '@modules/decorators/length-range';
import { Max, Min } from 'class-validator';


@InputType()
export class CreateGeoPointRequest {
    @Field() @Min(-90)  @Max(90)  lat!: number;
    @Field() @Min(-180) @Max(180) lon!: number;
}

@InputType()
export class CreateCircleRequest {
    @Field()
    center!: CreateGeoPointRequest;

    @Field() @Min(200)
    radius!: number;   
}


@InputType()
export class RegisterRequest implements Credentials {

    @Field()
    targetArea!: CreateCircleRequest;

    @Field()
    fullname!: string;

    @Field()
    @LengthRange(UserPropLimits.UsernameLength)
    login!: string;

    @Field()
    @LengthRange(UserPropLimits.PasswordLength)
    password!: string;
    
}