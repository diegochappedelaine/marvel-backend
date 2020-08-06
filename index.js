const express = require("express");
const axios = require("axios");
const app = express();
const MD5 = require("crypto-js/md5");

const cors = require("cors");
app.use(cors());

require("dotenv").config();

// Accès à l'API
const timestamp = Date.now();
const myHash = MD5(
    timestamp +
        process.env.MARVEL_PRIVATE_API_KEY +
        process.env.MARVEL_PUBLIC_API_KEY
);

app.get("/comics", async (req, res) => {
    console.log("route /comics");
    const offset = req.query.offset;
    const titleStartsWith = req.query.titleStartsWith;

    let apiLink = "http://gateway.marvel.com/v1/public/comics?limit=100";
    if (titleStartsWith) {
        apiLink += `&titleStartsWith=${titleStartsWith}`;
    }
    if (offset) {
        apiLink += `&offset=${offset}`;
    }
    apiLink += `&ts=${timestamp}&apikey=${process.env.MARVEL_PUBLIC_API_KEY}&hash=${myHash}`;

    try {
        const response = await axios.get(apiLink);
        res.json(response.data.data);
    } catch (error) {
        console.log(error);
    }
});

app.get("/comicssSearch", async (req, res) => {
    console.log("route /comicssSearch");

    const titleStartsWith = req.query.titleStartsWith;

    let apiLink = "http://gateway.marvel.com/v1/public/comics?limit=100";
    if (titleStartsWith) {
        apiLink = `http://gateway.marvel.com/v1/public/comics?titleStartsWith=${titleStartsWith}`;
    }
    apiLink += `&limit=100&ts=${timestamp}&apikey=${process.env.MARVEL_PUBLIC_API_KEY}&hash=${myHash}`;
    try {
        const response = await axios.get(apiLink);
        res.json(response.data.data);
    } catch (error) {
        console.log(error);
    }
});

app.get("/characters", async (req, res) => {
    console.log("route /characters");

    const offset = req.query.offset;
    const nameStartsWith = req.query.nameStartsWith;

    let apiLink = "http://gateway.marvel.com/v1/public/characters?limit=100";
    if (nameStartsWith) {
        apiLink = `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${nameStartsWith}&limit=100`;
    }
    if (offset) {
        apiLink += `&offset=${offset}`;
    }

    apiLink += `&ts=${timestamp}&apikey=${process.env.MARVEL_PUBLIC_API_KEY}&hash=${myHash}`;

    try {
        const response = await axios.get(apiLink);
        res.json(response.data.data);
    } catch (error) {
        console.log(error);
    }
});

// app.get("/charactersSearch", async (req, res) => {
//     console.log("route /charactersSearch");

//     const nameStartsWith = req.query.nameStartsWith;

//     let apiLink = "http://gateway.marvel.com/v1/public/characters?limit=100";
//     if (nameStartsWith) {
//         apiLink = `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${nameStartsWith}`;
//     }
//     apiLink += `&limit=100&ts=${timestamp}&apikey=${process.env.MARVEL_PUBLIC_API_KEY}&hash=${myHash}`;
//     try {
//         const response = await axios.get(apiLink);
//         res.json(response.data.data);
//     } catch (error) {
//         console.log(error);
//     }
// });

app.get("/", (req, res) => {
    res.json({ message: "Yo" });
});

app.listen(process.env.PORT, () => {
    console.log("Server has started");
});
