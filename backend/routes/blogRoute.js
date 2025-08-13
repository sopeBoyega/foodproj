import express from "express";
import { addBlogPost, getBlogPosts } from "../controllers/blogController.js";
import { upload } from "./foodRoute.js";



const blogRouter  = express.Router();
blogRouter.post("/add",upload.array("images"),addBlogPost)
blogRouter.get("/getBlogs",getBlogPosts)


export default blogRouter;
