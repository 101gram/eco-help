import { 
    Field,
    InputType
} from 'type-graphql';

import { IsOptional } from 'class-validator';
import * as CV from 'class-validator';
import { nullable } from '@modules/flags';
import { CreateGeoPointRequest } from '@graphql/types/register-request';

@InputType()
export class CreateEventPointRequest  {

    @Field()
    location!: CreateGeoPointRequest;

    @Field()
    @CV.MinLength(10)
    description!: string;

    @Field({ nullable })
    @CV.Min(0)
    @IsOptional()
    budget?: number;

    @Field()
    @CV.Min(1)
    @IsOptional()
    expectedMembers!: number;

    @Field()
    startDate!: Date;
    
}