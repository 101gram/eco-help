import * as I from '@modules/interfaces';
import { prop, Typegoose              } from 'typegoose';
import { ObjectType, Field } from 'type-graphql';
import { required          } from '@modules/flags';
import { GeoPointType      } from "@models/geo-point";
import { Min               } from 'class-validator';

@ObjectType('Circle')
export class CircleType extends Typegoose {

    @Field()
    @prop({ required })
    center!: GeoPointType;

    @Field()
    @Min(200)
    @prop({ required })
    radius!: number;

}
new CircleType().getModelForClass(CircleType);


export type CircleData = I.InstanceTypeProps<CircleType>;
