import * as I from '@modules/interfaces';
import { prop, Typegoose } from 'typegoose';
import { ObjectType, Field } from 'type-graphql';
import { required } from '@modules/flags';
import { Max, Min } from 'class-validator';


@ObjectType('GeoPoint')
export class GeoPointType extends Typegoose {
    @Field()
    @Max(90)
    @Min(-90)
    @prop({ required })
    lat!: number;

    @Field()
    @Max(180)
    @Min(-180)
    @prop({required})
    lon!: number;

}

new GeoPointType().getModelForClass(GeoPointType);
// export const GeoPoint = Utils.getModelFromTypegoose(GeoPointType);
// export type GeoPoint      = InstanceType<GeoPointModel>;
// export type GeoPointModel = typeof GeoPoint;
export type GeoPointData  = I.InstanceTypeProps<GeoPointType>;