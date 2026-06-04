const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

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

function filterByName(results, name) {
    return results.filter(item =>
        item.name.toLowerCase().includes(name.toLowerCase())
    );
}

function filterByCategory(results, category) {
    return results.filter(item =>
        item.category.toLowerCase() === category.toLowerCase()
    );
}

function sortResults(results, sort) {
    if (sort === "asc") {
        return results.sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }

    if (sort === "desc") {
        return results.sort((a, b) =>
            b.name.localeCompare(a.name)
        );
    }

    return results;
}

app.get("/search", (req, res) => {
    const { name, category, sort } = req.query;

    console.log("Search request:", req.query);

    let results = [...items];

    if (name) {
        results = filterByName(results, name);
    }

    if (category) {
        results = filterByCategory(results, category);
    }

    results = sortResults(results, sort);

    res.json(results);
});

app.post("/item", (req, res) => {
    const { id, name, category } = req.body;
    items.push({ id, name, category });
    res.json({ message: "Item added successfully" });
});

app.listen(PORT, () => {
    console.log(`Search service running on http://localhost:${PORT}`);
});
