import express from "express";
const app = express();
app.use(express.json());

let theatres = [
  { theatreId: 1, name: "Regal Cinemas", location: "Downtown" },
  { theatreId: 2, name: "AMC Theatres", location: "Midtown" },
  { theatreId: 3, name: "Cinemark", location: "Uptown" },
];

let shows = [
  { showId: 1, title: "The Lion King", theatreId: 1, time: "7:00 PM" },
  { showId: 2, title: "Hamilton", theatreId: 2, time: "8:00 PM" },
  { showId: 3, title: "Wicked", theatreId: 3, time: "9:00 PM" },
  { showId: 4, title: "Les Misérables", theatreId: 1, time: "6:00 PM" },
];

// funtions...

function getAllShows() {
  return shows;
}

function getShowById(id) {
  return shows.find((show) => show.showId === id);
}

function addNewShow(show) {
  show.showId = shows.length + 1;
  shows.push(show);
  return show;
}

// 1: Get All Shows

app.get("/shows", (req, res) => {
  try {
    let shows = getAllShows();
    if (shows.length === 0) {
      return res.status(404).json({ error: "No shows found" });
    }
    return res.status(200).json({ shows });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 2: Get Show by ID.

app.get("/shows/:id", (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let show = getShowById(id);
    if (!show) return res.status(404).json({ error: "No show found by ID" });
    return res.status(200).json({ show });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// 3: Add a New Show

app.post("/shows", (req, res) => {
  let newShow = addNewShow(req.body);
  if (!newShow) return res.status(400).json({ error: "Invalid input" });
  res.status(201).json(newShow);
});

export { app, getAllShows, getShowById, addNewShow };
