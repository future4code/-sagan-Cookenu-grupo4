import {Request, Response} from "express";
import {Authenticator} from "../services/Authenticator";
import {DataBase} from "../data/DataBase";

export const getFeed = async (req: Request, res: Response) => {
    try {

        const token = req.headers.authorization as string;

        const authenticator = new Authenticator();
        const authenticationData = authenticator.getData(token);

        const feed = await new DataBase().getFeedById(authenticationData.id)

        res.status(200).send({recipes: feed})
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
}