import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  UpdateMyProfileMutationArgs,
  UpdateMyProfileResponse
} from "../../../types/graph";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Mutation: {
    UpdateMyProfile: privateResolver(
      async (
        _,
        args: UpdateMyProfileMutationArgs,
        { req }
      ): Promise<UpdateMyProfileResponse> => {
        const user: User = req.user;
        const notNullCheckObject = {};

        // Object.key(args)  -  object 의 key 들을 배열로 리턴
        // 배열에서 반복돌려 null이 아니면 새 object에 위치
        // typeScript 에서 해당 파라미터가 null일 수 없기때문에.
        // 만약 된다해도 null값으로 업데이트가 되곘지?
        Object.keys(args).forEach(key => {
          if (args[key] !== null) {
            notNullCheckObject[key] = args[key];
          }
        });

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
