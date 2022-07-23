const express = require("express");
const moongoose = require("mongoose");
const Article = require("./models/article");
const articleRouter = require("./routes/articles");
const methodOverride = require("method-override");
const app = express();

require("dotenv").config();

const port = process.env.PORT || 5000;

moongoose.connect("mongodb://localhost/blogPost", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles });
});
app.use("/articles", articleRouter);

app.listen(port, () => {
  console.log("server is listening to port 5000");
});
