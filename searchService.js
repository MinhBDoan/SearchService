const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

// Sample data for any app sharing microservice
const items = [
    { id: 1, name: "Naruto", category: "Anime" },
    { id: 2, name: "One Piece", category: "Anime" },
    { id: 3, name: "Attack On Titan", category: "Anime" },
    { id: 4, name: "Plaid Shirt", category: "Clothing" },
    { id: 5, name: "Swim Shorts", category: "Clothing" },
    { id: 6, name: "Black Jacket", category: "Clothing" },
    { id: 7, name: "Hamburger", category: "Food" },
    { id: 8, name: "Chicken Alfredo", category: "Food" },
    { id: 9, name: "Hotpot", category: "Food" },
    { id: 10, name: "Red", category: "Paint" },
    { id: 11, name: "Blue", category: "Paint" },
    { id: 12, name: "Green", category: "Paint" }
];

// Search
app.get("/search", (req, res) => {
    let results = [...items];

    const { name, category, sort } = req.query;

    console.log("Search request:", req.query);

    // Search by name
    if (name) {
        results = results.filter(item =>
            item.name.toLowerCase().includes(name.toLowerCase())
        );
    }

    // Search by category
    if (category) {
        results = results.filter(item =>
            item.category.toLowerCase() === category.toLowerCase()
        );
    }

    // Sort results
    if (sort === "asc") {
        results.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "desc") {
        results.sort((a, b) => b.name.localeCompare(a.name));
    }

    res.json(results);
});

app.listen(PORT, () => {
    console.log(`Search service running on http://localhost:${PORT}`);
});