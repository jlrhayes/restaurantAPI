const request = require("supertest")
const app = require("./app")
const Company = require("./Company")
const Location = require("./Location")
const Menu = require("./Menu")
const Setup = require("./setupDb")




describe("Test adding to db", () => {
    test("Add a new company", async () => {
        const newCompany = await request(app).post("/companies").send({name: "Burger King"})
        expect(Company.findAll({where:{name: "Burger King"}})).toBeTruthy()
    });
});

describe("Test all get methods",() => {
    test("It should response the GET method",async () => {
      const response = await request(app).get("/");
      expect(response.statusCode).toBe(200);
    });

    test("Can get company list",async () => {
        const response = await request(app).get("/companies");
        const localResp = await Company.findAll({attributes:['id','name','logo_url']})
        console.log(localResp)
        expect(response.body).toBe(localResp);
      });
  });

