const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const env = require("dotenv");
env.config();

const app = express();
 const port = 3100;

 app.use(cors());
 app.use(express.json()); 
 app.use(express.urlencoded({extended: false}));
 
//  mongoose.connect("mongodb://localhost:27017/firstdb").then(()=> console.log("connected")).catch((error)=> console.log(error.message));
 mongoose.connect(`mongodb+srv://osesthedon:${process.env.database_password}@finance-tracker-app.hafqyft.mongodb.net/?retryWrites=true&w=majority&appName=finance-tracker-app`).then(()=> console.log("connected")).catch((error)=> console.log(error.message));

app.use("/api", require("./routes/dashboard"));
 app.use("/api", require("./routes/router"));

 app.listen(port, () =>{
    console.log(`application on port ${port}`);
 })
