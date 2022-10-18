module.exports = (sequelize, DataTypes) =>
sequelize.define('studyset', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
        },
        title: DataTypes.STRING,
        description: DataTypes.STRING(2048),
        cards: DataTypes.JSON
    })
