const { toResJson } = require("../utils/ResponseUtils");
const Post = require("../models/Post");

exports.getAll = async (req, res) => {
  let type = req.query.type ?? "post";
  let limit = parseInt(req.query.limit) === -1 ? Infinity : 4;
  let page = req.query.page ?? 1;
  let skip = limit * (page - 1);

  const count = await Post.count({
    type,
  });
  const posts = await Post.find({
    type,
  })
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);

  res.json(
    toResJson({
      data: posts.map((post) => post.toJson()),
      total: count,
      limit,
      page,
    })
  );
};

exports.createOrUpdate = async (req, res) => {
  console.log(req.body);
  const { user } = req;
  const { id } = req.params;
  const { title, content, imageId, type } = req.body;

  let post;
  let _type = "post";

  if (type === "contact") {
    _type = "contact";
  }

  if (type === "about") {
    _type = "about";
  }

  if (_type === "post") {
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
  } else if (_type !== "post") {
    post = await Post.findOne({ type: _type });
    if (!post) {
      post = await new Post();
    }
  }

  post.title = title;
  post.content = content;
  post.author = user.id;
  post.imageId = imageId;
  post.type = _type;

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
