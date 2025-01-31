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
    }
    res.status(200).json(response);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }

  //   try {
  //     const id = parseInt(req.params.id);
  //     const post = await Post.getOneById(id);
  //     res.json(post);
  //   } catch (err) {
  //     res.status(404).json({ error: err.message });
  //   }
}

async function destroy(req, res) {
  try {
    const id = parseInt(req.params.id);
    const post = await Post.getOneById(id);
    const result = await post.destroy();
    res.status(204).end();
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function update(req, res) {
  const id = req.params.id;
  try {
    const post = await Post.getOneByTitle(title);
    const result = await post.update(req.body);
    res.status(404).send(result);
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
