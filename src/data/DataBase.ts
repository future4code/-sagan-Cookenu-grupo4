import dotenv from "dotenv";
import {BaseDataBase} from "./BaseDataBase";

dotenv.config();

export class DataBase extends BaseDataBase{
    private static USER_TABLE_NAME = "cookenu_user";


    public async createUser(
        id_user: string,
        name_user: string,
        email_user: string,
        password_user: string,
    ): Promise<void> {
        await this.getConnection()
            .insert({
                id_user,
                name_user,
                email_user,
                password_user,
            })
            .into(DataBase.USER_TABLE_NAME);
    }

}