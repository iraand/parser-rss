const db = require("./db");
const postsModel = db.posts;

const postsParse = require("../services/postsParse");
const formatePost = require("../services/postFormate");

const checkNewPosts = async (posts) => {
 try {
  const titlesAllAddedPosts = await postsModel
   .find()
   .select({ title: 1 })
   .exec();

  // check DB is not eampty
  if (!titlesAllAddedPosts || titlesAllAddedPosts.length < 1) {
   return posts;
  }

  const titlesAllAddedPostsArray = titlesAllAddedPosts.map(
   (item) => item.title
  );

  const latestAddedPost = await postsModel.find().sort({ pubDate: 1 }).exec();

  const newPosts = posts.filter(
   (post) =>
    post.pubDate > latestAddedPost[0].pubDate &&
    !titlesAllAddedPostsArray.includes(post.title)
  );

  console.log(`Found ${newPosts.length} New Posts`);

  return newPosts;
 } catch (error) {
  console.log(error);
 }
};

const updatePosts = async () => {
 try {
  const parsedPosts = await postsParse();
  const formatedPosts = formatePost(parsedPosts.items);
  const newPosts = await checkNewPosts(formatedPosts);

  if (newPosts && newPosts.length > 0) {
   return await addNewPosts(newPosts);
  }
 } catch (error) {
  throw { status: 500, message: error };
 }
};

const getPagination = (page, size) => {
 const limit = size ? size : 10;
 const offset = page ? page * limit : 0;

 return { limit, offset };
};

const getAllPosts = async (filterParams) => {
 const page = parseInt(filterParams.page) - 1 || 0;
 const size = parseInt(filterParams.size) || 0;
 const order = filterParams.order || null;

 const categories = filterParams.categories || null;
 const title = filterParams.title || null;

 const { limit, offset } = getPagination(page, size);

 try {
  let query = null;

  const sortOptions = () => {
   if (order) {
    if (order === "desc") {
     return {
      title: -1,
     };
    }
    if (order === "asc") {
     return {
      title: 1,
     };
    }
   }

   return { pubDate: 1 };
  };

  const options = {
   limit: limit,
   page: page,
   offset: offset,
   sort: sortOptions(),
  };

  if (categories) {
   return await postsModel.find().select({ categories: 1 });
  }

  if (title) {
   return await postsModel.find().select({ title: 1, id: 1 });
  }

  const allPosts = await postsModel.paginate(query, options, (err, result) => {
   return result;
  });

  return allPosts;
 } catch (error) {
  throw { status: 500, message: error };
 }
};

const createNewPost = async (_newPost) => {
 const newPost = _newPost[0];
 try {
  return new postsModel({
   postId: newPost.postId,
   title: newPost.title,
   creator: newPost.creator,
   link: newPost.link,
   content: newPost.content,
   contentSnippet: newPost.contentSnippet,
   categories: newPost.categories,
   pubDate: newPost.pubDate,
  }).save();
 } catch (error) {
  throw { status: error?.status || 500, message: error?.message || error };
 }
};

const addNewPosts = async (newPosts) => {
 try {
  const addedPosts = await newPosts.map((newPost) => {
   return new postsModel({
    id: newPost.id,
    title: newPost.title,
    creator: newPost.creator,
    link: newPost.link,
    content: newPost.content,
    contentSnippet: newPost.contentSnippet,
    categories: newPost.categories,
    pubDate: newPost.pubDate,
   }).save();
  });

  console.log(`${addedPosts.length} posts were inserted`);

  return addedPosts;
 } catch (error) {
  console.log(error);
 }
};

const getOnePost = async (id) => {
 console.log(id);
 try {
  return await postsModel.findOne({ id }).exec();
 } catch (error) {
  throw { status: error?.status || 500, message: error?.message || error };
 }
};

const updateOnePost = async ({ id }, changes) => {
 console.log(changes);

 try {
  return await postsModel
   .findOneAndUpdate({ id }, changes, { returnDocument: "after" })
   .exec();
 } catch (error) {
  throw { status: error?.status || 500, message: error?.message || error };
 }
};

const deleteOnePost = async (id) => {
 try {
  await postsModel.findOneAndRemove({ id });
  console.log(`Post was deleted`);
 } catch (error) {
  throw { status: error?.status || 500, message: error?.message || error };
 }
};

module.exports = {
 getAllPosts,
 getOnePost,
 createNewPost,
 updateOnePost,
 deleteOnePost,
 addNewPosts,
 updatePosts,
};
