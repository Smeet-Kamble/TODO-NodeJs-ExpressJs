import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const monthList = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const d = new Date();
let day = weekday[d.getDay()];
let month = monthList[d.getMonth()];
let dayNum = d.getDate();
let year = d.getFullYear();
var tasks = [];
var work = [];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home.ejs", {
    dayR: day,
    monR: month,
    daynum: dayNum,
    year: year,
    items: tasks
  });
});

app.get("/work.ejs", (req, res) => {
  res.render("work.ejs", {
    dayR: day,
    monR: month,
    daynum: dayNum,
    year: year,
    items: work
  });
});

app.post("/submit", (req, res) => {
  var key = Object.keys(req.body)[0];  
  var val = req.body[key];

  if(key === "input-home"){
    tasks.push(val);
    res.redirect("/");
  }else{
    work.push(val);
    res.redirect("work.ejs");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
