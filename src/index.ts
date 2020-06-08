import express, {Request, Response} from "express";
import dotenv from "dotenv";
import {AddressInfo} from "net";
import {signup} from "./Endpoints/EndpointSignup";
import { login } from "./Endpoints/EndpointLogin";
import {getSelfProfile} from "./Endpoints/EndpointGetSelfProfile";
import { createRecipe } from "./Endpoints/EndpointCreateRecipe";
import { getRecipe } from "./Endpoints/EndpointGetRecipe";
import { getFeed } from "./Endpoints/EndpointGetFeed";
import {getOtherProfile} from "./Endpoints/EndpointGetOtherProfile";
import {followUser} from "./Endpoints/EndpointFollowUser";
import {unFollowUser} from "./Endpoints/EndpointUnfollowUser";

dotenv.config();

const app = express();

app.use(express.json());

const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
});

async function main(): Promise<void> {

    app.post("/signup", signup);
    app.post("/login", login)
    app.get("/user/profile",getSelfProfile)
    app.get("/user/feed", getFeed)
    app.get("/user/:id", getOtherProfile)
    app.post("/recipe", createRecipe)
    app.get("/recipe/:id", getRecipe)
    app.post("/user/follow", followUser)
    app.post("/user/unfollow",unFollowUser)

}

main();