//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
let moneyValues = [];
let moneyCategories = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.render("transaction", {moneyData: moneyValues});
})

app.get("/report",function(req,res){
    res.render("report", {moneyData: moneyValues,moneyPieData: moneyCategories});
})

app.get("/input",function(req,res){
  res.render("input");
})

app.post("/input",function(req,res){
  const moneyValue = {
    amount: parseInt(req.body.amount),
    type: req.body.type,
    category: req.body.category,
    day: new Date(req.body.day),
  };
  const moneyCategory = {
    amount: parseInt(req.body.amount),
    type: req.body.type,
    category: req.body.category,
    day: new Date(req.body.day),
  }
  b = 0, idx = 0;
  for(let i=0; i<moneyCategories.length; i++){
    if(moneyValues[i].day === moneyValue.day && moneyValues[i].type === moneyValue.type ){
      b = 1; idx = i;break;
    }
  }
  if(b == 0){
    moneyValues.push(moneyValue);
  }else{
    moneyValues[idx].amount = moneyValue.amount + moneyValues[idx].amount;
  }
  b = 0, idx = 0;
  for(let i=0; i<moneyCategories.length; i++){
    if(moneyCategories[i].category === moneyCategory.category){
      b = 1; idx = i;break;
    }
  }
  if(b == 0){
    moneyCategories.push(moneyCategory);
  }else{
    moneyCategories[idx].amount += moneyCategory.amount;
  }

  res.redirect("/");
})











app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
