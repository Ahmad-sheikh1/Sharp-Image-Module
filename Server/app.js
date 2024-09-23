const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;
const convertedroute = require("./Routes/upload.route")

// Middlewares
app.use(cors({
    origin: '*', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));
  
  
app.use("/Api/Upload", convertedroute)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Testing Api
app.get("/Api", (req, res) => {
    res.send("Api is Working")
})

//  Server Listening
app.listen((PORT), () => {
    console.log(`Server is Listening on ${PORT}`);
})