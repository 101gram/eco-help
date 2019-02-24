import * as I from '@modules/interfaces';
import * as Utils from '@modules/utils';
import { EventPointType, EventPoint, EventPointTryCrud } from '@models/event-point';
import { 
    Resolver,
    Query,
    Arg,
    Ctx,
    Authorized,
    Mutation,
    FieldResolver,
    Root
} from 'type-graphql';
import { ResolveContext, AuthorizedResolveContext } from '@graphql/resolve-context';
import { CreateEventPointRequest                  } from '@graphql/types/create-event-point-request';
import { UpdateEventPointRequest                  } from '@graphql/types/update-event-point-request';
import { UserTryCrud, UserType, UserRole          } from '@models/user';
import { sendNotification                         } from '@routes/telegram-bot';


@Resolver(EventPointType)
export class EventPointResolver {
    
    @FieldResolver(_type => UserType)
    async creator(@Root() root: EventPointType) {
        return Utils.docToObjectType(await UserTryCrud.tryFindById(root.creatorId));
    }


    @Authorized()
    @Mutation(_returns => EventPointType)
    async createEventPoint(
        @Ctx()   {user}: AuthorizedResolveContext,  
        @Arg('req') req: CreateEventPointRequest
    ) {

        if (req.startDate.getMilliseconds() <= Date.now()) {
            throw new Error('Event start date is too early');
        }

        const ep = await EventPoint.create({...req, creatorId: user.id, currentMembers: 1});

        setTimeout(() => ep.remove(), req.startDate.getMilliseconds() - Date.now());

        return Utils.docToObjectType(ep);
    }

    @Authorized()
    @Mutation(_returns => EventPointType)
    async updateEventPoint(@Ctx() ctx: ResolveContext,  @Arg('req') req: UpdateEventPointRequest){
        const targetEventPoint = await EventPointTryCrud.tryFindById(req.id);        
        
        if (!ctx.user!.id.equals(targetEventPoint.creatorId) || ctx.user!.role !== UserRole.Admin) {
            throw Error('You have no rights to update this event point');
        }

        const newEp = await EventPointTryCrud.tryUpdateById(req.id, {...req, creatorId: ctx.user!.id});
        return Utils.docToObjectType(newEp);
    }

    @Query(_returns => EventPointType)
    async getEventPoint(@Arg('id') id: I.ObjectId) {
        return Utils.docToObjectType(await EventPointTryCrud.tryFindById(id));
    }

    @Query(_returns => [EventPointType])
    async getAllEventPoints() {
        return (await EventPoint.find({}).exec()).map(Utils.docToObjectType);
    }


    @Authorized([UserRole.Admin, UserRole.Regular])
    @Mutation(_returns => EventPointType)
    async deleteEventPoint(@Ctx() ctx: ResolveContext, @Arg('id') id: I.ObjectId){
        const targetEventPoint = await EventPointTryCrud.tryFindById(id);        
        
        if (!ctx.user!.id.equals(targetEventPoint.creatorId) || ctx.user!.role !== UserRole.Admin) {
            throw Error('You have no rights to delete this event point');
        }
        await targetEventPoint.remove();
        return Utils.docToObjectType(targetEventPoint);
    }

    @Authorized()
    @Mutation(_returns => EventPointType)
    async assignEventPoint(@Ctx() { user }: ResolveContext, @Arg('id') id: I.ObjectId){
        const targetEventPoint = await EventPointTryCrud.tryFindById(id);

        if (user!.id.equals(targetEventPoint.creatorId)) {
            throw Error('You are already a creator');
        }

        ++targetEventPoint.currentMembers;
        user!.assignedEvents.push(id);

        await Promise.all([targetEventPoint.save(), user!.save()]);
        const creator = await UserTryCrud.tryFindById(targetEventPoint.creatorId);
        if(creator.notification &&  creator.tgChatId){
           await sendNotification(creator.tgChatId, `New person join to your event! Current count of members is ${targetEventPoint.currentMembers}`);
        }
        return targetEventPoint;
    }

    @Authorized()
    @Mutation(_returns => EventPointType)
    async leaveEventPoint(@Ctx() { user }: ResolveContext, @Arg('id') id: I.ObjectId){
        const targetEventPoint = await EventPointTryCrud.tryFindById(id);

        if (user!.id.equals(targetEventPoint.creatorId)) {
            throw Error('You can`t leave your event');
        }
        const eventIdIndex = user!.assignedEvents.findIndex(eventId => eventId.equals(id));
        if (eventIdIndex < 0) {
            throw new Error(`You are not assigned to this event point`);
        }

        user!.assignedEvents.splice(eventIdIndex, 1);
        --targetEventPoint.currentMembers;

        await Promise.all([targetEventPoint.save(), user!.save()]);
        return targetEventPoint;
    }
}