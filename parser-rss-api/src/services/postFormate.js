const { v4: uuid } = require("uuid");

const formatePost = (posts) => {
 if (posts && posts.length > 0) {
  return posts.map((post) => ({
   id: uuid(),
   title: post.title,
   creator: post.creator,
   link: post.link,
   content: post.content,
   contentSnippet: post.contentSnippet,
   categories: post.categories,
   pubDate: post.pubDate,
  }));
 }

 return;
};

module.exports = formatePost;
