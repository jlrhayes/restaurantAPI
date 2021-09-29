const sequelize = require('./db')
const Company = require("./Company")
const Location = require("./Location")
const Menu = require("./Menu")

async function setup(){
    Company.hasMany(Location)
    Location.belongsTo(Company)
    Location.hasMany(Menu)
    Menu.belongsTo(Location)
    await sequelize.sync()
}

module.exports = setup;