import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Query: {
    // GetMyProfile을 부르는건 아니고
    // authResolver 를 불러서 토큰에 해당하는 아이디값이 context에 req.user로 있는 지 검사
    // authResolver 에 파라미터로 넣어준 함수는 if문을 통과하면 graphql이 넘긴 함수를 resolver로 실행
    // 이런 기법을 curry 커링? 이라고하네
    // authResolver(FnHere)(parent, args, context)
    GetMyProfile: privateResolver(async (_, __, { req }) => {
      const { user } = req;
      return {
        ok: true,
        error: null,
        user
      };
    })
    //     GetMyProfile: async (_, __, { req }) => {
    //       const { user } = req;
    //       return {
    //         ok: true,
    //         error: null,
    //         user
    //       };
    //     }
  }
};

export default resolvers;
