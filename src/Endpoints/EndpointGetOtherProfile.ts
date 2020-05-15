import  {Request, Response} from "express";
import {DataBase} from "../data/DataBase";
import {Authenticator} from "../services/Authenticator";



export const getOtherProfile = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string;
        const otherId = req.params.id

        const authData = await new Authenticator().getData(token)

        const user = await new DataBase().getUserById(otherId)

        if(!user){
            res.status(404).send({
                message: "Usuario não encontrado",
            });
        }
        else{
            res.status(200).send({
                id: authData.id,
                name: user.name,
                email: user.email,
            })
        }
    } catch (error) {
        res.status(400).send({
            message: error.message,
        });
    }
}
