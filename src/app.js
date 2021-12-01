const express = require("express");

const connect = require("./configs/db")

const app = express();

app.use(express.json());

const userController = require("./controllers/user.controller")

const galleryController = require("./controllers/gallery.controller")

app.use("/users", userController)

app.use("/gallerys", galleryController)

app.listen(2348, async ()=> {
    await connect();
    console.log("I am listening 2348")
})