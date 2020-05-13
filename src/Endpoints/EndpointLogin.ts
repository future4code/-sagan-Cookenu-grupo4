import  {Request, Response} from "express";
import {DataBase} from "../data/DataBase";
import {Authenticator} from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { BaseDataBase } from "../data/BaseDataBase";


export const login = async (req: Request, res: Response) => {
    try {

        if (!req.body.email || req.body.email.indexOf("@") === -1) {
            throw new Error("Invalid email");
        }
        
        if (!req.body.password || req.body.password.length < 6) {
            throw new Error("Invalid password");
        }

        const userData ={
            email: req.body.email,
            password: req.body.password,
        }

        const userDataBase = new DataBase();
        const user = await userDataBase.getUserByEmail(userData.email)

        if(!user) {
            throw new Error("Email não cadastrado.")
        }

        const hashManager = new HashManager();
        const passwordValid = await hashManager.compare(userData.password, user.password)

        if (!passwordValid) {
            throw new Error("Senha invalida")
        }

        const authenticator = new Authenticator();
        const token = authenticator.generateToken({
          id: user.id,
        });

        res.status(200).send({
            token: token,
        })
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }

    await BaseDataBase.destroyConnection();
}