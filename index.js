const express = require("express"); //import express
const mongoose = require("mongoose"); //import mongoose
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const http = require("http");
const ApolloServerPluginLandingPageGraphQLPlayground =
    require("apollo-server-core").ApolloServerPluginLandingPageGraphQLPlayground;
const Resolvers = require("./graphql/index.js");
const typeDefs = require("./graphql/schema.js");
require("dotenv").config();

async function startServer() {
    const app = express(); //Creates an Express application
    const httpserver = http.createServer(app);

    app.use(express.json()); //Parse JSON bodies
    app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

    const server = new ApolloServer({
        typeDefs,
        resolvers: Resolvers,
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground({ httpserver }),
        ],
    });

    await server.start();
    server.applyMiddleware({ app, path: "/graphql" });

    // app.use(cors());
    app.use("/graphql", express.json(), server.getMiddleware());



    // process.env.CONNECTION_STRING: gets the connection string from the environment variables
    const CONECTION_STRING = process.env.REACT_APP_CONECTION_STRING;

    //Connect to the database
    // mongoose.connect: connects to the database
    await mongoose
        .connect(CONECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Connected to the database");
        })
        .catch((err) => {
            console.log("Error connecting to the database");
            console.log(err);
        });

    const PORT = process.env.PORT || 4000; //Port number at which the server listens

    app.listen(PORT, () => {
        console.log(
            `Server started on port http://localhost:${PORT}${server.graphqlPath}`
        );
    });
}

startServer(); //Start the server
