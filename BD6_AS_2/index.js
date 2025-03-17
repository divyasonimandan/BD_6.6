import express from "express";
const app = express();
app.use(express.json());

let stocks = [
  { stockId: 1, ticker: "AAPL", companyName: "Apple Inc.", price: 150.75 },
  { stockId: 2, ticker: "GOOGL", companyName: "Alphabet Inc.", price: 2750.1 },
  { stockId: 3, ticker: "TSLA", companyName: "Tesla, Inc.", price: 695.5 },
];

let trades = [
  {
    tradeId: 1,
    stockId: 1,
    quantity: 10,
    tradeType: "buy",
    tradeDate: "2024-08-07",
  },
  {
    tradeId: 2,
    stockId: 2,
    quantity: 5,
    tradeType: "sell",
    tradeDate: "2024-08-06",
  },
  {
    tradeId: 3,
    stockId: 3,
    quantity: 7,
    tradeType: "buy",
    tradeDate: "2024-08-05",
  },
];

// functions...

function getAllStocks() {
  return stocks;
}

// 1: Retrieve All Stocks

app.get("/stocks", (req, res) => {
  try {
    let stocks = getAllStocks();
    if (stocks.length === 0) {
      return res.status(404).json({ message: "No stocks found" });
    }
    res.status(200).json({ stocks });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export { app };
