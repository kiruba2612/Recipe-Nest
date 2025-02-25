const express = require("express");
const app = express();
const port = 3001;
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const Recipe = require("./models/recipe");
const User = require("./models/user");
const moverride = require("method-override");
// const el_data = require("./elderdata.json");
// const ad_data = require("./adultdata.json");
// const ki_data = require("./kiddata.json");
// DB Connection

mongoose.connect("mongodb://localhost:27017/recipe");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});
// page config
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));
app.use(moverride("_method"));
// app.engine("ejs", ejsMate);

// routes

app.get("/", async (req, res) => {
  res.render("recipes/home");
});

// login route
app.get("/login", (req, res) => {
  res.render("users/login");
});

app.post("/login", (req, res) => {
  res.render("recipes/home");
  console.log(req.body);
});

// register route
app.get("/register", (req, res) => {
  res.render("users/register");
});

app.post("/register", async (req, res) => {
  const data = req.body;
  const user = new User(data);
  await user.save();
  res.render("recipes/home");
  console.log(req.body);
});

// new recipe Route
app.get("/new", (req, res) => {
  res.render("recipes/new");
});

app.post("/new", async (req, res) => {
  const data = req.body;
  const recipe = new Recipe(data);
  await recipe.save();
  res.render("recipes/show", { recipe });
});
// Index route
app.get("/recipe", async (req, res) => {
  const recipes = await Recipe.find({});
  // console.log(recipes);
  res.render("recipes/index", { recipes });
});

// show route
app.get("/show/:id", async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.render("recipes/show", { recipe });
});

// edit route
app.get("/edit/:id", async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.render("recipes/edit", { recipe });
  // res.redirect("recipes/show", { recipe });
});
// update route
app.put("/recipe/:id", async (req, res) => {
  const { id } = req.params;
  await Recipe.findByIdAndUpdate(
    id,
    {
      ...req.body.recipe,
    },
    { new: true }
  );
  res.redirect(`/show/${id}`);
});

// Delete route
app.delete("/recipe/:id", async (req, res) => {
  const { id } = req.params;
  await Recipe.findByIdAndDelete(id);
  res.redirect("/recipe");
});

// diet routes
// elder route
app.get("/diet/elder", (req, res) => {
  res.render("diet/elders", { data: el_data });
});
// adult route
app.get("/diet/adult", (req, res) => {
  res.render("diet/adults", { data: ad_data });
});
// kids route
app.get("/diet/kid", (req, res) => {
  res.render("diet/kids", { data: ki_data });
});
//server running route
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
