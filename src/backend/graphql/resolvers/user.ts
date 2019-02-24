import * as I from '@modules/interfaces';
import { UserType, UserTryCrud } from '@models/user';
import { 
    Resolver,
    Query,
    Arg,
    Ctx,
    Authorized
} from 'type-graphql';
import { ResolveContext } from '@graphql/resolve-context';
import { UpdateMeRequest } from '@graphql/types/update-me-request';


@Resolver()
export class UserResolver {// implements ResolverInterface<UserData> {

    @Query(_returns => UserType)
    async getUser(@Arg('id') id: I.ObjectId) {
        return UserTryCrud.tryFindById(id);
    }

    @Query(_returns => UserType)
    getMe(@Ctx() {user}: ResolveContext) {
        return user;
    }
   

    @Authorized()
    @Query(_returns => UserType)
    async updateMe(@Ctx() ctx: ResolveContext, @Arg('req') req: UpdateMeRequest) {
        // @TODO remove null from required props
        return UserTryCrud.tryUpdateById(ctx.user!.id, req);
    }
}

