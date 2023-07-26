import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("nice working");
});

app.app.listen(4000, () => {
  console.log("Server is listing on port 4000");
});
