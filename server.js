import "dotenv/config";

import express from "express";
import "express-async-errors";
import expressauth from "express-openid-connect";

import path from "path";
import { fileURLToPath } from "url";
import { api } from "./api/api-router.js";
const { auth, requiresAuth } = expressauth;

const app = express();

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: "https://" + process.env.AUTH0_DOMAIN,
  })
);

app.use(requiresAuth());

app.use(express.static("web/page"));
app.use(express.static("web"));

app.use("/api", api);

app.get("/", (req, res) => {
  res.redirect("/home");
});

app.get("/user/*", (req, res) => {
  res.sendFile(
    path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      "web/page/user/index.html"
    )
  );
});

app.listen(4000);
