require("dotenv").config();
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const uri =
 process.env.DATABASE_URI ||
 "mongodb+srv://iraandaral:053Denis78@cluster0.a8jrdox.mongodb.net/db-posts";

mongoose.connect(uri);
const db = mongoose.connection;

db.posts = require("./models/posts/posts.model.js")(mongoose, mongoosePaginate);
db.user = require("./models/user/user.model");
db.role = require("./models/user/role.model");
const Role = db.role;
db.ROLES = ["user"];

db.on("error", (error) => {
 console.log(error);
});

db.once("connected", () => {
 console.log("Database Connected");
 initial();
});

module.exports = db;

const initial = () => {
 Role.estimatedDocumentCount((err, count) => {
  if (!err && count === 0) {
   new Role({
    name: "user",
   }).save((err) => {
    if (err) {
     console.log("error", err);
    }

    console.log("added 'user' to roles collection");
   });
  }
 });
};
