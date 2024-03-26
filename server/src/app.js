import express from "express";
import cors from "cors";
import { inject } from "@vercel/analytics";
import { injectSpeedInsights } from "@vercel/speed-insights";
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
    origin: [
      "*",
    ],
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

// vercel:-
inject();
injectSpeedInsights();

// routers


//using on
app.use("/api/v1/question", )

export { app };
