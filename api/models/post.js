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

  static async getOneByCategory(category) {
    const response = await db.query(
      "SELECT * FROM post WHERE LOWER(category) = LOWER($1)",
      [category]
    );
    if (response.rows.length <= 0) {
      throw new Error("Unable to locate posts.");
    }
    return response.rows.map((cat) => new Post(cat));
  }

  static async getOneByDate(date) {
    const response = await db.query(
      "SELECT * FROM post WHERE created_at::text LIKE $1;",
      [`${date}%`]
      //convert timestable to text value to use LIKE operator
    );

    if (response.rows.length <= 0) {
      throw new Error("Unable to find posts from this date");
    }

    return response.rows.map((post) => new Post(post));
  }

  static async create(data) {
    const { title, content, category } = data;
    let response = await db.query(
      "INSERT INTO post (title, content, category) VALUES ($1, $2, $3) RETURNING *;",
      [title, content, category]
    );

    return new Post(response.rows[0]);
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
