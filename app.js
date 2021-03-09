//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");

const app = express();
const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", (req, res) => {
  console.log(req.body);
  const currentDay = date.getDate();
  res.render("list", {
    listTitle: currentDay,
    newItem: items
  });
});



app.get("/work", (req, res) => {
  res.render("list", {
    listTitle: "Work List",
    newItem: workItems
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.post("/", function(req, res) {
  const redirectPath = req.body.list;
  const item = req.body.newItem;

  if (redirectPath.toLowerCase().startsWith("work")) {
    if (item.length > 0) {
      workItems.push(item);
    }
    res.redirect("/work");

  } else {
    if (item.length > 0) {
      items.push(item);
    }
    res.redirect("/");
  }

});



app.listen(3000, () => {
  console.log("server started at port 3000");
});
