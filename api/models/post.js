const db = require("../database/connect");

class Post {
  constructor({ post_id, title, content, created_at }) {
    this.id = post_id;
    this.title = title;
    this.content = content;
    this.timestamp = created_at;
  }

  static async getAll() {
    const response = await db.query("SELECT * FROM post");
    return response.rows.map((p) => new Post(p));
  }

  static async getOneById(id) {
    const response = await db.query("SELECT * FROM post WHERE post_id = $1", [
      id,
    ]);
    if (response.rows.length != 1) {
      throw new Error("Unable to locate post.");
    }
    return new Post(response.rows[0]);
  }

  static async create(data) {
    const { title, content } = data;
    let response = await db.query(
      "INSERT INTO post (title, content) VALUES ($1, $2) RETURNING post_id;",
      [title, content]
    );
    const newId = response.rows[0].post_id;
    const newPost = await Post.getOneById(newId);
    return newPost;
  }

  async destroy() {
    let response = await db.query(
      "DELETE FROM post WHERE post_id = $1 RETURNING *;",
      [this.id]
    );
    return new Post(response.rows[0]);
  }

  async update(data) {
    const content = data.content;

    const response = await db.query(
      "UPDATE post SET content = $1 WHERE post_id = $2 RETURNING title, content",
      [content, this.id]
    );
    if (response.rows.length !== 1) {
      throw Error("Unable to update");
    }
    return new Post(response.rows[0]);
  }
}

module.exports = Post;
