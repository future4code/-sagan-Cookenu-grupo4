import  {Request, Response} from "express";
import {DataBase} from "../data/DataBase";
import {Authenticator} from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { BaseDataBase } from "../data/BaseDataBase";
import { RecipeDataBase } from "../data/RecipeDataBase";
import { CreateId } from "../services/CreateId";

export const createRecipe = async (req: Request, res: Response) => {
    try {

        if (!req.body.title) {
            throw new Error("Invalid title");
        }

        if (!req.body.description) {
            throw new Error("Invalid description")
        }

        const token = req.headers.authorization as string;

        const authenticator = new Authenticator();
        const authenticationData = authenticator.getData(token);
        
    
        const recipeData = {
            title: req.body.title,
            description: req.body.description
        }

        const id = new CreateId().create();
        
        const recipeDb = new RecipeDataBase();
        await recipeDb.createRecipe(
            { title: recipeData.title, description: recipeData.description, id, creationDate: new Date() },
            authenticationData.id
        )

        res.status(200).send()
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
}