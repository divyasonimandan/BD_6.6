import express from "express";
const app = express();
app.use(express.json());

let reviews = [
  { id: 1, content: "Great product!", userId: 1 },
  { id: 2, content: "Not bad, could be better.", userId: 2 },
];

let users = [
  { id: 1, name: "John Doe", email: "john.doe@example.com" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
];

// functions

async function getAllReviews() {
  return reviews;
}

async function getReviewById(id) {
  return reviews.find((review) => review.id === id);
}

async function addNewReview(data) {
  data.id = reviews.length + 1;
  reviews.push(data);
  return data;
}

async function getUserById(id) {
  return users.find((user) => user.id === id);
}

async function addNewUser(user) {
  user.id = users.length + 1;
  users.push(user);
  return user;
}

// 1: Get All Reviews.

app.get("/reviews", async (req, res) => {
  const reviews = await getAllReviews();
  res.json(reviews);
});

// 2: Get Review by ID.

app.get("/reviews/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let review = await getReviewById(id);
  if (!review)
    return res.status(404).json({ message: "No review found by ID " + id });
  res.json(review);
});

// 3: Add a New Review.

app.post("/reviews/new", async (req, res) => {
  let newReview = await addNewReview(req.body);
  res.status(201).json(newReview);
});

// 4: Get User by ID.

app.get("/users/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let user = await getUserById(id);
  if (!user)
    return res.status(404).json({ message: "No user found by ID " + id });
  res.json(user);
});

// 5: Add a New User.

app.post("/users/new", async (req, res) => {
  let newUser = await addNewUser(req.body);
  res.status(201).json(newUser);
});

export {
  app,
  getAllReviews,
  getReviewById,
  addNewReview,
  getUserById,
  addNewUser,
};
