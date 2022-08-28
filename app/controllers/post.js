const { toResJson } = require("../utils/ResponseUtils");
const Post = require("../models/Post");

exports.getAll = async (req, res) => {
  const count = await Post.count();
  const posts = await Post.find();
  res.json(
    toResJson({ data: posts.map((post) => post.toJson()), total: count })
  );
};

exports.createOrUpdate = async (req, res) => {
  const { user } = req;
  const { id } = req.params;
  const { title, content, image_id } = req.body;

  let post;

  if (id) {
    post = await Post.findById(id);
    if (!post) {
      return res.json(
        toResJson({ status: "FAILED", message: "Post not found", code: 404 })
      );
    }
  } else {
    post = await new Post();
  }

  post.title = title;
  post.content = content;
  post.author = user.id;
  post.image_id = image_id;

  await post.save();
  res.json(toResJson({ data: post.toJson(), message: "Post saved" }));
};

exports.getOne = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) {
    return res.json(
      toResJson({ status: "FAILED", message: "Post not found", code: 404 })
    );
  }
  res.json(toResJson({ data: post.toJson() }));
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) {
    return res.json(
      toResJson({ status: "FAILED", message: "Post not found", code: 404 })
    );
  }
  await post.remove();
  res.json(toResJson({ message: "Post deleted" }));
};
