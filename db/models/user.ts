import {Sequelize, DataTypes} from "sequelize-typescript";

const {models} = require("@next-auth/sequelize-adapter");

module.exports = (sequelize: Sequelize, DataTypes) => sequelize.define(
    'user',
    {
        ...models.User,
    }
)
