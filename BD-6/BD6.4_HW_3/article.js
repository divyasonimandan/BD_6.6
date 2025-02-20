let articles = [
  { id: 1, title: "Introduction to JavaScript", author: "Jane Smith" },
  { id: 2, title: "Advanced CSS Techniques", author: "Tom Brown" },
];

let comments = [{ id: 1, articleId: 1, content: "Very informative article!" }];

let users = [{ id: 1, name: "Alice Johnson", email: "alice@example.com" }];

async function getAllArticles() {
  return articles;
}

async function getArticleById(id) {
  return articles.find((article) => article.id === id);
}

async function getAllComments() {
  return comments;
}

async function getCommentById(id) {
  return comments.find((comment) => comment.id === id);
}

async function getUserById(id) {
  return users.find((user) => user.id === id);
}

export {
  getAllArticles,
  getArticleById,
  getAllComments,
  getCommentById,
  getUserById,
};
