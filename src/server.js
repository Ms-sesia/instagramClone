import "./env";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import "./passport";
import { authenticateJwt } from "./passport";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request })
});

server.express.use(logger("dev")); // middleware 추가. express() 를 app에 넣어서 app.use로 사용하는데 바로 express.user로 이용.
server.express.use(authenticateJwt);


server.start({ port: PORT }, () => console.log(`Server running on http://localhost:${PORT}`));