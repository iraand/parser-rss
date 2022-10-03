const Posts = require("../database/Posts");
const formatePost = require("../services/postFormate");

// Retrieve all Posts from the database.
const getAllPosts = async (req, res) => {
 const filterParams = req.query;

 try {
  const allPosts = await Posts.getAllPosts(filterParams);
  res.send({
   data: allPosts,
  });
 } catch (error) {
  res
   .status(error?.status || 500)
   .send({ status: "FAILED", data: { error: error?.message || error } });
 }
};

const getOnePost = async (req, res) => {
 const {
  params: { id },
 } = req;

 try {
  const onePost = await Posts.getOnePost(id);
  res.send({
   status: "OK",
   data: onePost,
  });
 } catch (error) {
  res
   .status(error?.status || 500)
   .send({ status: "FAILED", data: { error: error?.message || error } });
 }
};

const createNewPost = async (req, res) => {
 const { body } = req;

 if (!body.title || !body.content || !body.creator) {
  res.status(400).send({
   status: "FAILED",
   data: {
    error:
     "One of the following keys is missing or is empty in request body: 'title', 'content', 'creator'",
   },
  });
  return;
 }
 const newPost = {
  creator: body.creator,
  title: body.title,
  link: body.link || "",
  pubDate: new Date(),
  content: body.content,
  contentSnippet: body.contentSnippet || "",
  categories: body.categories.split("") || [],
 };

 const formatedNewPost = formatePost([newPost]);

 try {
  const createdPost = await Posts.createNewPost(formatedNewPost);

  res.status(201).send({ status: "OK", data: createdPost });
 } catch (error) {
  res
   .status(error?.status || 500)
   .send({ status: "FAILED", data: { error: error?.message || error } });
 }
};

const updateOnePost = async (req, res) => {
 const {
  body,
  params: { id },
 } = req;

 if (!id) {
  res.status(400).send({
   status: "FAILED",
   data: { error: "Parameter ':postId' can not be empty" },
  });
 }

 try {
  const updatedPost = await Posts.updateOnePost(id, body);
  res.send({ status: "OK", data: updatedPost });
 } catch (error) {
  res
   .status(error?.status || 500)
   .send({ status: "FAILED", data: { error: error?.message || error } });
 }
};

const deleteOnePost = async (req, res) => {
 const {
  params: { id },
 } = req;

 if (!id) {
  res.status(400).send({
   status: "FAILED",
   data: { error: "Parameter ':id' can not be empty" },
  });
 }

 try {
  await Posts.deleteOnePost(id);
  res.status(204).send({ status: "OK" });
 } catch (error) {
  res
   .status(error?.status || 500)
   .send({ status: "FAILED", data: { error: error?.message || error } });
 }
};

module.exports = {
 getAllPosts,
 getOnePost,
 createNewPost,
 updateOnePost,
 deleteOnePost,
};
