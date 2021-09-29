const sequelize = require("./db");
const { DataTypes, Model } = require("sequelize");

class Company extends Model {}

Company.init(
    {
        name: DataTypes.STRING,
        logo_url: DataTypes.STRING
    },
    {
        sequelize,
        modelName: "Company",
        timestamps: false,
    })

module.exports = Company