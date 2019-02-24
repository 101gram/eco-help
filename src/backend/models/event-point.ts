import * as Utils from '@modules/utils';
import * as I from '@modules/interfaces';
import { ObjectType, Field, Int } from "type-graphql";
import { prop, Typegoose, pre   } from "typegoose";
import { Min                    } from 'class-validator';
import { GeoPointType           } from "@models/geo-point";
import { TryCrud                } from '@modules/mongoose-utils/try-crud';
import { Paginator              } from '@modules/mongoose-utils/paginate';
import { nullable, required     } from '@modules/flags';
import { UserType, User         } from '@models/user';



@ObjectType('EventPoint')
@pre<EventPointType>('remove', async function(next) {
    User.update(
        { assignedEvents: { $elemMatch: { $eq: this.id } } }, 
        { assignedEvents: { $pull:      { $eq: this.id } } }
    )
    .then(() => next())
    .catch(next);
})
export class EventPointType extends Typegoose {

    @Field()
    @prop()
    get id(this: EventPoint): I.ObjectId {
        return this._id;
    }

    @Field()
    @prop({ required })
    location!: GeoPointType;

    @Field()
    @prop({ required })
    description!: string;

    @Field({ nullable })
    @prop({ required: false })
    photoUrl?: string;

    @Field()
    @prop({ required, ref: UserType })
    creatorId!: I.ObjectId;

    @Field(_type => Int)
    @Min(0)
    @prop({ required, default: 0 })
    currentMembers!: number;

    @Field(_type => Int)
    @Min(1)
    @prop({ required, default: 0 })
    expectedMembers!: number;

    @Field()
    @Min(0)
    @prop({ required, default: 0 })
    budget!: number;

    @Field()
    @prop({ required })
    startDate!: Date;

    @Field()
    @prop({ required, default: Date.now })
    publishDate!: Date;

}

export const EventPoint = Utils.getModelFromTypegoose(EventPointType);

export const EventPointTryCrud   = new TryCrud(EventPoint);
export const EventPointPaginator = new Paginator<EventPointData, EventPoint>({ model: EventPoint });

export type EventPoint      = InstanceType<EventPointModel>;
export type EventPointModel = typeof EventPoint;
export type EventPointData  = I.TypegooseDocProps<EventPointType>;