import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  UpdateMyProfileMutationArgs,
  UpdateMyProfileResponse
} from "../../../types/graph";
import User from "../../../entities/User";
import cleanNullArgs from "../../../utils/cleanNullArg";

const resolvers: Resolvers = {
  Mutation: {
    UpdateMyProfile: privateResolver(
      async (
        _,
        args: UpdateMyProfileMutationArgs,
        { req }
      ): Promise<UpdateMyProfileResponse> => {
        const user: User = req.user;
        const notNullCheckObject: any = cleanNullArgs(args);

        // user 인스턴스가 없으면 before insert update 가 실행안됨.
        if (notNullCheckObject.password) {
          user.password = notNullCheckObject.password;
          await user.save();
          delete notNullCheckObject.password;
        }

        try {
          await User.update({ id: user.id }, { ...notNullCheckObject });
          return {
            ok: true,
            error: null
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message
          };
        }
      }
    )
  }
};

export default resolvers;
