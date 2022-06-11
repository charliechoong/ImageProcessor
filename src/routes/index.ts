import express from "express";
import images from "./api/images";
import { promises as fsPromises } from "fs";

const routes = express.Router();

routes.get("/", (req, res) => {
  res.send("Welcome to Image Processing API.");
});

routes.use("/images", images);

export default routes;