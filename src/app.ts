import { GraphQLServer } from "graphql-yoga";
import cors from "cors";
import helmet from "helmet";
import logger from "morgan";
import schema from "./schema";
import decodeJWT from "./utils/decodeJWT";
import { NextFunction, Response } from "express";

// helmet은 보안을 위한 미들웨어 요청때마다 미들웨어가 요청을 잠시멈추고 검사 한후 위험하지않으면 요청계속진행
class App {
  public app: GraphQLServer;
  constructor() {
    this.app = new GraphQLServer({
      schema,
      // context를 통해 모든 resolvers 에서 context 파라미터를 통해 유저정보나 필요정보를 사용할 수 있다.
      context: req => {
        return {
          req: req.request
        };
      }
    });
    this.middlewares();
  }

  private middlewares = (): void => {
    this.app.express.use(cors());
    this.app.express.use(logger("dev"));
    this.app.express.use(helmet());
    this.app.express.use(this.jwt);
  };

  // 헤더에 토큰있는지 미들웨어에서 감시
  private jwt = async (
    req,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const token = req.get("X-JWT");
    if (token) {
      const user = await decodeJWT(token);
      // 해당 토큰에 해당하는 유저가 있으면 request에 새로운 user property를 붙인다.
      if (user) {
        req.user = user;
      } else {
        req.user = undefined;
      }
    }
    next();
  };
}

export default new App().app;
