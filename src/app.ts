import { GraphQLServer } from "graphql-yoga";
import cors from "cors";
import helmet from "helmet";
import logger from "morgan";
import schema from "./schema";

// helmet은 보안을 위한 미들웨어 요청때마다 미들웨어가 요청을 잠시멈추고 검사 한후 위험하지않으면 요청계속진행
class App {
     public app : GraphQLServer;
     constructor(){
          this.app = new GraphQLServer({
               schema
          });
          this.middlewares();
     }

     private middlewares = () : void => {
          this.app.express.use(cors());
          this.app.express.use(logger("dev"));
          this.app.express.use(helmet());
     }
}

export default new App().app;