const Parser = require("rss-parser");
const feedUrl = "https://lifehacker.com/rss";

const parsePosts = async () => {
 try {
  const data = await new Parser().parseURL(feedUrl);
  console.log(`Parsed ${data.items.length} posts`);
  return data;
 } catch (error) {
  console.log(error);
 }
};

module.exports = parsePosts;
