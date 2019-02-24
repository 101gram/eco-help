import * as I from '@modules/interfaces';
import { 
    Field,
    InputType
} from 'type-graphql';

import { IsOptional } from 'class-validator';
import * as CV from 'class-validator';
import { nullable } from '@modules/flags';
import { UpdateGeoPointRequest } from './update-me-request';

@InputType()
export class UpdateEventPointRequest  {

    @Field()
    id!: I.ObjectId;

    @Field()
    location!: UpdateGeoPointRequest;

    @Field()
    @CV.MinLength(10)
    description!: string;

    @Field({ nullable })
    @CV.Min(1)
    @IsOptional()
    budget?: number;

    @Field()
    @CV.Min(1)
    @IsOptional()
    expectedMembers!: number;

    @Field()
    startDate!: Date;

    @Field()
    @CV.IsUrl()
    photoUrl?: string;
    
}