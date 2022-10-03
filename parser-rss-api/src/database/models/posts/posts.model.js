const mongoose = require("mongoose");
const { Schema } = mongoose;

module.exports = (mongoose, mongoosePaginate) => {
 const postSchema = Schema(
  {
   id: String,
   title: String,
   creator: String,
   link: String,
   content: String,
   contentSnippet: String,
   categories: Array,
   pubDate: String,
  },
  { collection: "posts" },
  { timestamps: true }
 );

 postSchema.plugin(mongoosePaginate);

 const postsModel = mongoose.model("postsModel", postSchema);

 return postsModel;
};
