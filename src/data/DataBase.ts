import dotenv from "dotenv";
import {BaseDataBase} from "./BaseDataBase";
import moment from 'moment'

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

    public async getFeedById(id: string): Promise<any> {
        const result = await this.getConnection()
        .select(
            `${DataBase.USER_TABLE_NAME}.name_user`,
            `rc.*`
        )
        .from(DataBase.USER_TABLE_NAME)
        .join("cookenu_user_follow as uf", "uf.id_user_followed", `${DataBase.USER_TABLE_NAME}.id_user`)
        .join("cookenu_recipe as rc", "rc.id_user_creator", `${DataBase.USER_TABLE_NAME}.id_user` )
        .where({ id_user: id })

        return result.map((feed => {
            return {
                id: feed.id_recipe,
                title: feed.title_recipe,
                description: feed.description_recipe,
                createdAt: moment(feed.create_date_recipe).format("DD/MM/YYYY"),
                userId: feed.id_user_creator,
                userName: feed.name_user
            }
        }))
    }
}