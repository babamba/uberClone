import app from "./app";
import { Options } from "graphql-yoga";

const PORT : number | string = process.env.PORT || 4000; 
const PLAYGROUND_ENDPOINT : string = "/playground";
const GRAPHQL_ENDPOINT : string = "/graphql";

const appOptions : Options = {
     port : PORT,
     playground : PLAYGROUND_ENDPOINT,
     endpoint : GRAPHQL_ENDPOINT
};

const handleAppSet = () => console.log(`Listen on port ${PORT}`);

app.start(appOptions, handleAppSet);