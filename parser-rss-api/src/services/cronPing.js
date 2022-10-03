const cron = require("node-cron");
const { updatePosts } = require("../database/Posts");

const cronServise = async () => {
 try {
  cron.schedule(" 0 0 0 * * *", async () => {
   await updatePosts();
  });
 } catch (error) {
  console.log(error);
 }
};

module.exports = cronServise;
