import * as Vts from 'vee-type-safe';
import * as I from '@modules/interfaces';
import { 
    Field,
    InputType
} from 'type-graphql';

import { nullable } from '@modules/flags';
import { IsUrl, IsOptional, Min, Max } from 'class-validator';
import { UserData } from '@models/user';
import { CircleData } from '@models/circle';
import { GeoPointData } from '@models/geo-point';

const NullableString = Field(_type => String, { nullable });


@InputType()
export class UpdateGeoPointRequest implements I.UpdateRequest<GeoPointData> {
    @Field() @Min(-90)  @Max(90)  @IsOptional() lat!: number;
    @Field() @Min(-180) @Max(180) @IsOptional() lon!: number;
}

@InputType()
export class UpdateCircleRequest implements I.UpdateRequest<CircleData> {
    @Field()
    center?: UpdateGeoPointRequest;

    @Field() @Min(200) @IsOptional()
    radius?: number;   
}

@InputType()
export class UpdateMeRequest implements Vts.MappedObject<Partial<UserData>, unknown> {
    @Field(_type => UpdateCircleRequest, { nullable })
    targetArea?: I.Maybe<UpdateCircleRequest>;
    
    @IsUrl()
    @IsOptional()
    @NullableString avaUrl?:   I.Maybe<string>;
    @NullableString fullname?: I.Maybe<string>;
    @NullableString tgName?:   I.Maybe<string>;
}