const express = require('express')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const setupDB = require('./setupDb')
const Company = require("./Company")
const Location = require("./Location")
const Menu = require("./Menu")

async function sandbox(){
    await setupDB()
}

app.get("/", (req, res) => {
    res.status(200).send("Hello World!");
  });

app.get("/companies", async (req,res) =>{ // prints all companies
    const companies = await Company.findAll()
    res.json(companies)
})

app.post("/companies", async (req,res)=>{ //creates new company
    const newCompany = await Company.create({name: req.body["name"]})
    res.send('Added Company')
})

app.get("/companies/:companyId", async (req,res) =>{ // gets specific company
    const company = await Company.findByPk(req.params.companyId)
    res.json(company)
})

app.delete("/companies/:companyId", async (req,res) =>{ // deletes a company
    const company = await Company.findByPk(req.params.companyId)
    const destroy = await Company.destroy(company)
    res.send("Removed Company")
})

app.get("/companies/:companyId/locations", async (req,res) =>{ // gets all company locations
    const locations = await Location.findAll({where: {CompanyId : req.params.CompanyId}})
    res.json(locations)
})

app.get("/companies/:companyId/locations/:locationId", async (req,res) =>{ //gets specific location
    const location = await Location.findByPk(req.params.locationId)
    res.json(location)
})

app.delete("/companies/:companyId/locations/:locationId", async (req,res) =>{ // deletes a company
    const location = await Location.findByPk(req.params.locationId)
    const destroy = await Location.destroy(location)
    res.send("Removed locaton")
})


app.post("companies/:companyId/locations", async (req,res) =>{ // add location
    const newLocation = await Location.create({name : req.body["name"], capacity: req.body["capacity"], manager: req.body["manager"] , CompanyId: req.params.companyId})
    res.send("Added Location")
})


app.get("/companies/:companyId/locations/:locationId/menus", async (req,res) =>{ //gets all menus from location
    const menus = await Menu.findAll({where:{ LocationId: req.params.locationId}})
    res.json(menus)
})

sandbox()

module.exports = app