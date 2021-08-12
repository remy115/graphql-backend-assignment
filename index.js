const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { v4: uuidv4 } = require("uuid");

const typeDefs = require("./src/schemas");
const resolvers = require("./src/resolvers");

const SimplyRetsAPI = require("./src/dataSources/SimplyRets");

const dataSources = () => ({
  SimplyRetsAPI: new SimplyRetsAPI(),
});

const context = () => {
  // it's good to have an ID for every request, so we can keep track of it. (for errors, for any "Pub/Sub"/event kind of implementation)
  const requestId = uuidv4();
  return {
    requestId,
  };
};

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    dataSources,
  });
  await server.start();

  const app = express();

  app.use("/graphql", (req, res, next) => {
    const auth = req.get("Authorization") || "";
    if (auth) {
      const authData = Buffer.from(auth, "base64").toString("utf8");
      const [user, pass] = authData.split(":");
      if (user === "user1@sideinc.com" && pass === "676cfd34-e706-4cce-87ca-97f947c43bd4") {
        return next();
      }
    }
    res.status(401).send("forbidden!");
  });

  server.applyMiddleware({ app, path: "/graphql" });

  // const httpServer = app.listen({ port: 4000 }, () => console.log(`Listening on http://localhost:4000/graphql`));

  return { server, app };
};

// start server only when not in "test" env
if (process.env.NODE_ENV !== "test") {
  startServer().then(({ app }) => {
    app.listen({ port: 4000 }, () => console.log(`Listening on http://localhost:4000/graphql`));
  });
}

module.exports = {
  startServer,
};
