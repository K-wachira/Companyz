const express = require("express");
const { Server } = require("socket.io");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const authRouter = require("./routers/authRouter");
const profRouter = require("./routers/profRouter");
const mediaRouter = require("./routers/mediaRouter");
const reviewerRouter = require("./routers/reviewerRouter");
const session = require("express-session");
const Redis = require("ioredis");
const server = require("http").createServer(app);
const RedisStore = require("connect-redis")(session);
require("dotenv").config();
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: "true",
  },
});
const redisClient = new Redis();

app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    credentials: true,
    name: "sid",
    store: new RedisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.ENVIRONMENT === "production" ? "true" : "auto",
      httpOnly: true,
      expires: 1000 * 60 * 60 * 24 * 7,
      sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
    },
  })
);
app.use("/auth", authRouter);
app.use("/profile", profRouter);
app.use("/assets", mediaRouter);
app.use("/reviewer", reviewerRouter);

io.on("connect", (socket) => {});

server.listen(4000, () => {
  console.log("Server listening on port 4000");
});
