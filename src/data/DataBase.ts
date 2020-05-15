import dotenv from "dotenv";
import {BaseDataBase} from "./BaseDataBase";
import moment from 'moment'

dotenv.config();

export class DataBase extends BaseDataBase{
    private static USER_TABLE_NAME = "cookenu_user";
    private static FOLLOW_TABLE_NAME = "cookenu_user_follow";


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

    public async getUserById(
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
    public async followUser(
        id_user_follow: string,
        id_user_followed:string

    ): Promise <void> {
        await this.getConnection()
            .insert({id_user_follow,id_user_followed})
            .into(DataBase.FOLLOW_TABLE_NAME)
    }

    public async getUserFollowStatus(
        id_user_follow: string,
        id_user_followed:string
    ): Promise<boolean> {
        const result = await this.getConnection().raw(`
            SELECT * FROM ${DataBase.FOLLOW_TABLE_NAME}
            WHERE id_user_follow = "${id_user_follow}" AND id_user_followed = "${id_user_followed}";
        `)

        if(result[0][0]) {
            return false
        }
        else{
            return true
        }
    }
    public async unFollowUser(
        id_user_follow: string,
        id_user_followed:string
    ): Promise<void> {
         await this.getConnection().raw(`
            DELETE FROM ${DataBase.FOLLOW_TABLE_NAME}
            WHERE id_user_follow = "${id_user_follow}" AND id_user_followed = "${id_user_followed}";
        `)
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