import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    school: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: String }],
    images: [{ type: String }],
    date: { type: Date, required: true },
    author: { type: String, required: true },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    slug: { type: String },
    featuredImage: { type: String },
    readTime: { type: Number },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

const blogModel = mongoose.models.blog || mongoose.model("blog",blogSchema)

export default blogModel;
