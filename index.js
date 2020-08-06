const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.json({ message: "Yo" });
});

app.listen(4000, () => {
    console.log("Server has started");
});
