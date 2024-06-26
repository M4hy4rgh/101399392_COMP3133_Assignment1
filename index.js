const express = require("express"); //import express
const mongoose = require("mongoose"); //import mongoose
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const Resolvers = require("./graphql/index.js");
const typeDefs = require("./graphql/schema.js");
require("dotenv").config();

const app = express(); // Move the app creation outside of startServer()

async function startServer() {
    // const app = express(); //Creates an Express application

    app.use(cors());
    // app.use((req, res, next) => {
    //     res.setHeader("Access-Control-Allow-Origin", "https://101399392-comp3133-assig2.vercel.app/graphql");
    //     res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
    //     res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    //     if (req.method === "OPTIONS") {
    //         return res.sendStatus(200);
    //     }
    //     next();
    // });



    app.use(express.json()); //Parse JSON bodies
    app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

    const server = new ApolloServer({
        typeDefs,
        resolvers: Resolvers,
        cacheControl: {
            defaultMaxAge: 60,
        },
        persistedQueries: false, // or cache: "bounded"
        cache: "bounded" // Set cache to "bounded"
    });

    await server.start();
    server.applyMiddleware({ app, path: "/graphql" });

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

// export default startServer; //Export the startServer function
module.exports = app; 