const {models} = require("@next-auth/sequelize-adapter");

module.exports = (sequelize, DataTypes) => sequelize.define(
    'user',
    {
        ...models.User,
    }
)
