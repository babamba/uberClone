import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import { EditPlaceResponse, EditPlaceMutationArgs } from "../../../types/graph";
import Place from "../../../entities/Place";
import cleanNullArgs from "../../../utils/cleanNullArg";

const resolvers: Resolvers = {
  Mutation: {
    EditPlace: privateResolver(
      async (
        _,
        args: EditPlaceMutationArgs,
        { req }
      ): Promise<EditPlaceResponse> => {
        const user: User = req.user;
        try {
          // TypeOrm 은 릴레이션된걸 자동으로 로드하지않기때문에  relations추가
          //const place = await Place.findOne({ id: args.placeId }, {relations : ["user"]});
          // 관련된 정보 전부 로드되기 때문에 entity 에서 유저아이디 컬럼 추가
          const place = await Place.findOne({ id: args.placeId });
          if (place) {
            if (place.userId === user.id) {
              const notNull = cleanNullArgs(args);
              await Place.update({ id: args.placeId }, { ...notNull });

              return {
                ok: true,
                error: null
              };
            } else {
              return {
                ok: false,
                error: "Not authorized"
              };
            }
          } else {
            return {
              ok: false,
              error: "Place Not Found"
            };
          }
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
