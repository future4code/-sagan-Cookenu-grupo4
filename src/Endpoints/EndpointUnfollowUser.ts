import  {Request, Response} from "express";
import {DataBase} from "../data/DataBase";
import {Authenticator} from "../services/Authenticator";

export const unFollowUser = async (req: Request, res: Response) => {
    try {
        if (!req.body.userToUnfollowId) {
            throw new Error("missing parameter user id");
        }
        const authData = await new Authenticator().getData(req.headers.authorization as string)
        const user = await new DataBase().getUserById(authData.id)
        const userToFollow = await new DataBase().getUserById(req.body.userToUnfollowId)

        if(!await new DataBase().getUserFollowStatus(user.id,userToFollow.id)){
            await new DataBase().unFollowUser(user.id,userToFollow.id)
        }
        else {
            throw new Error("you dont follow this id!");
        }

        res.status(200).send({message: "Unfollowed successfully"})
    } catch (error) {
        res.status(400).send({
            message: error.message,
        });
    }
}