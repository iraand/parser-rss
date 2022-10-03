const express = require("express");
const apicache = require("apicache");
const postsController = require("../controllers/posts.controller");
const { authJwt } = require("../middlewares");

const router = express.Router();
const cache = apicache.middleware;

router.get("/", cache("1 minutes"), postsController.getAllPosts, [
 authJwt.verifyToken,
]);

router.get("/:id", postsController.getOnePost, [authJwt.verifyToken]);

router.post("/", postsController.createNewPost, [authJwt.verifyToken]);

router.patch("/:id", postsController.updateOnePost, [authJwt.verifyToken]);

router.delete("/:id", postsController.deleteOnePost, [authJwt.verifyToken]);

module.exports = router;
