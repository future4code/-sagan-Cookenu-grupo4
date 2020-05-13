import  {Request, Response} from "express";
import {DataBase} from "../data/DataBase";
import {CreateId} from "../services/CreateId";
import {Authenticator} from "../services/Authenticator";


export const signup = async (req: Request, res: Response) => {
    try {
        if (!req.body.name) {
            throw new Error("Invalid name");
        }
        if (!req.body.email || req.body.email.indexOf("@") === -1) {
            throw new Error("Invalid email");
        }
        if (!req.body.password || req.body.password.length < 6) {
            throw new Error("Invalid password");
        }
        const userData ={
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }
        const id = new CreateId().create();
        await new DataBase().createUser(id,userData.name,userData.email,userData.password);
        const token = await new Authenticator().generateToken({id})
        res.status(200).send({token: token})
    } catch (error) {
        res.status(400).send({
            message: error.message,
        });
    }
}
