import dotenv from "dotenv";
import {BaseDataBase} from "./BaseDataBase";

dotenv.config();

export class RecipeDataBase extends BaseDataBase {
    private static USER_TABLE_NAME = "cookenu_recipe";


    public async createRecipe(
        recipe: RecipeData,
        idUser: string,
    ): Promise<void> {
        await this.getConnection()
        .insert({
            id_recipe: recipe.id,
            title_recipe: recipe.title,
            description_recipe: recipe.description,
            create_date_recipe: recipe.creationDate,
            id_user_creator: idUser
        }).into(RecipeDataBase.USER_TABLE_NAME)
    }

    public async getById(id: string): Promise<any> {
        const result = await this.getConnection()
        .select("*")
        .from(RecipeDataBase.USER_TABLE_NAME)
        .where({ id_recipe: id })
        .first();

        return result
    }

}

export interface RecipeData {
    id: string, 
    title: string,
    description: string,
    creationDate: Date, 
}