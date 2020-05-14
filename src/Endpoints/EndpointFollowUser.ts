import  {Request, Response} from "express";
import {DataBase} from "../data/DataBase";
import {Authenticator} from "../services/Authenticator";



export const followUser = async (req: Request, res: Response) => {
    try {
        if (!req.body.userToFollowId) {
            throw new Error("missing parameter user id");
        }
        const authData = await new Authenticator().getData(req.headers.authorization as string)
        const user = await new DataBase().getUserById(authData.id)
        const userToFollow = await new DataBase().getUserById(req.body.userToFollowId)
        await new DataBase().followUser(user.id,userToFollow.id)

        res.status(200).send({"message": "Followed successfully"})
    } catch (error) {
        res.status(400).send({
            message: error.message,
        });
    }
}
