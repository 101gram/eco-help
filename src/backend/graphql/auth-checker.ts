import { AuthChecker    } from "type-graphql";
import { ResolveContext } from "@graphql/resolve-context";
import { UserRole       } from "@models/user";

export const authChecker: AuthChecker<ResolveContext, UserRole> = ({context: {user}}, roles) => (
    user != null && (roles.length === 0 || roles.includes(user.role))
);