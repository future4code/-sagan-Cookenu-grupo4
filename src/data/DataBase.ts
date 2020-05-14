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

    public async getUserByEmail(email_user: string): Promise<any> {
        const result = await this.getConnection()
        .select("*")
        .from(DataBase.USER_TABLE_NAME)
        .where({email_user});

        return result[0]
    }

    public async getSelfProfile(
        id_user: string,
    ): Promise<any> {
        const result = await this.getConnection()
            .select("*")
            .from(DataBase.USER_TABLE_NAME)
            .where({id_user});
        const user = {
            id: result[0].id_user,
            name: result[0].name_user,
            email: result[0].email_user,
        }
        return user;
    }

}