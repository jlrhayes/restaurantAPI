const sequelize = require("./db");
const { DataTypes, Model } = require("sequelize");

class Menu extends Model {}

Menu.init(
    {
        name: DataTypes.STRING
    },
    {
        sequelize,
        modelName: "Menu",
        timestamps: false,
    })

module.exports = Menu