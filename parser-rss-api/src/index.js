require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const postRouter = require("./routes/posts.routes");
const { swaggerDocs: V1SwaggerDocs } = require("./swagger");
const cronPing = require("./services/cronPing");
const cors = require("cors");
const { updatePosts } = require("./database/Posts");
const app = express();

const PORT = process.env.NODE_DOCKER_PORT || 8080;

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use("/posts", postRouter);

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

app.listen(PORT, async () => {
 console.log(`API is listening on port ${PORT}`);
 V1SwaggerDocs(app, PORT);
 await updatePosts();
 await cronPing();
});
