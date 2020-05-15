import  {Request, Response} from "express";
import {Authenticator} from "../services/Authenticator";
import { RecipeDataBase } from "../data/RecipeDataBase";

export const getRecipe = async (req: Request, res: Response) => {
    try {
        
        const token = req.headers.authorization as string;

        const authenticator = new Authenticator();
        authenticator.getData(token);

        const id = req.params.id

        const recipeDb = new RecipeDataBase();
        const recipe = await recipeDb.getById(id)

        res.status(200).send(recipe)

    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }

}