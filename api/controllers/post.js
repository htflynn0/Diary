const Post = require("../models/Post");

async function index(req, res) {
  try {
    const posts = await Post.getAll();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function create(req, res) {
  try {
    const data = req.body;
    const result = await Post.create(data);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function show(req, res) {
  try {
    let response;
    if (req.query.category) {
      response = await Post.getByCategory(req.query.category);
    } else if (req.query.date) {
      response = await Post.getByDate(req.query.date);
    } else if (req.params.title) {
      response = await Post.getOneByTitle(req.params.title);
      1;
    }
    res.status(200).json(response);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function destroy(req, res) {
  try {
    const title = req.params.title;
    const post = await Post.getOneByTitle(title);
    const result = await post.destroy();
    res.status(204).end();
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function update(req, res) {
  const title = req.params.title;
  try {
    const post = await Post.getOneByTitle(title);
    const result = await post.update(req.body);
    res.status(200).send(result);
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
}

module.exports = {
  index,
  create,
  show,
  destroy,
  update,
};
