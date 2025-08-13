import blogModel from "../models/blogModel.js";

const addBlogPost = async (req, res) => {
  try {
    // Handle image files
    const imageFilenames = req.files?.map(file => file.filename) || [];

    // Optionally parse tags if passed as a comma-separated string
    const tagsArray = typeof req.body.tags === "string"
      ? req.body.tags.split(",").map(tag => tag.trim())
      : req.body.tags || [];

    const blog = new blogModel({
      title: req.body.title,
      school: req.body.school,
      description: req.body.description,
      content: req.body.content,
      tags: tagsArray,
      images: imageFilenames,
      featuredImage: req.body.featuredImage, // maybe a separate upload or field
      date: req.body.date,
      author: req.body.author,
      status: req.body.status || "draft",
      slug: req.body.slug,
      readTime: req.body.readTime,
    });

    await blog.save();
    res.json({ success: true, message: "Blog post added" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const getBlogPosts = async (req, res) => {
  try {
    const blogs = await blogModel.find().sort({ createdAt: -1 });
    res.json({ success: true, data: blogs });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error fetching blog posts" });
  }
};

export { addBlogPost, getBlogPosts };
