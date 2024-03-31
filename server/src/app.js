import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  cors({
    origin: ["*"],
    credentials: true,
    methods: "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  })
);
app.options("*", cors());

app.use(
  express.json({
    limit: "50mb",
  })
);

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routers
import userRouter from "./routes/user.routes.js";
import solutionRouter from "./routes/solution.routes.js";
import geminiRouter from "./routes/gemini.routes.js";

//using on
app.use("/api/v1/users", userRouter);
app.use("/api/v1/solutions", solutionRouter);
app.use("/api/v1/gemini", geminiRouter);

export { app };
