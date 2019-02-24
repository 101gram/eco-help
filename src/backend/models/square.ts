import { Typegoose, prop } from 'typegoose';
import { ObjectType, Field } from 'type-graphql';
import { required } from '@modules/flags';
import { GeoPointType } from "@models/geo-point";

@ObjectType('Square')
export class SquareType extends Typegoose {

    @Field()
    @prop({ required })
    location!: GeoPointType;

    @Field()
    @prop({ required })
    width!: number;

    @Field()
    @prop({ required })
    length!: number;
}


// export const Square = Utils.getModelFromTypegoose(SquareType);
// export type Square      = InstanceType<SquareModel>;
// export type SquareModel = typeof Square;
// export type SquareData  = I.TypegooseDocProps<SquareType>;
