const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const Cars = require("./models/Cars");

const app = express();

//Session Setup
const sess = {
  secret: "SUPERSECRET123123",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30, //milliseconds
    http: true,
    secure: false,
    sameSite: "strict",
  },
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Static Directory for css/js/images
app.use(express.static("public"));

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const hbs = exphbs.create({
  helpers: {
    displayCarLink: function (year, make, model) {
      return `Link to a ${year} ${make} ${model}`;
    },
  },
});

//Sets handlebars configurations
app.engine("handlebars", hbs.engine);
//Sets our app to use the handlebars engine
app.set("view engine", "handlebars");

const shopTitle = "Bobs Cars for Sale";

app.get(["/", "/cars"], async (req, res) => {
  const carData = await Cars.findAll();
  const carArrayPlain = carData.map((car) => car.get({ plain: true }));
  res.render("allcars", {
    shopTitle: shopTitle,
    allCars: carArrayPlain,
    lastCar: req.session.lastCar,
  });
});

app.get("/car/:id", async (req, res) => {
  const carData = await Cars.findByPk(req.params.id);
  const carPlain = carData.get({ plain: true });
  console.log(carPlain);
  req.session.save(function () {
    req.session.lastCar = carPlain.make + " " + carPlain.model;
  });
  res.render("car", carPlain);
});

app.get("/addcar", async (req, res) => {
  res.render("addcar");
});

app.post("/api/addcar", async (req, res) => {
  console.log("req.body", req.body);
  try {
    const carData = await Cars.create({
      year: parseInt(req.body.year),
      make: req.body.make,
      model: req.body.model,
      price: parseInt(req.body.price),
      image: req.body.image,
      sold: req.body.sold === "true" ? true : false,
    });
    res.status(200).json("success!");
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Listening on PORT:" + PORT));
});
