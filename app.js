const express = require("express");
const app = expres();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("hola mundo");
});

app.post("/", (res, req) => {
  res.send("tengo algo");
});

app.listen(PORT, () => console.log("Server run in http://localhost:3000"));
