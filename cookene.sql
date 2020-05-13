USE sagan_dennis_db;
CREATE TABLE cookenu_user (
	id_user VARCHAR (255) NOT NULL PRIMARY KEY,
    email_user VARCHAR (255) NOT NULL,
    name_user VARCHAR (255) NOT NULL,
    password_user VARCHAR (255) NOT NULL
);
CREATE TABLE cookenu_user_follow (
	id_user_follow VARCHAR (255) NOT NULL PRIMARY KEY,
    id_user_followed VARCHAR (255) NOT NULL,
    FOREIGN KEY (id_user_follow) REFERENCES cookenu_user(id_user)
);
CREATE TABLE cookenu_recipe(
	id_recipe VARCHAR (255) NOT NULL PRIMARY KEY,
    title_recipe VARCHAR (255) NOT NULL,
    description_recipe VARCHAR (255) NOT NULL,
    create_date_recipe DATE NOT NULL,
    FOREIGN KEY (id_recipe) REFERENCES cookenu_user(id_user)
);