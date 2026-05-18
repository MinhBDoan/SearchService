const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Search by name
async function searchByName() {
    const res = await fetch("http://localhost:3001/search?name=naruto");
    const data = await res.json();
    console.log("Search by name:", data);
}

// Search by category
async function searchByCategory() {
    const res = await fetch("http://localhost:3001/search?category=Food");
    const data = await res.json();
    console.log("Search by category:", data);
}

// Search + sort
async function searchAndSort() {
    const res = await fetch("http://localhost:3001/search?category=anime&sort=asc");
    const data = await res.json();
    console.log("Search + sort:", data);
}

// Run all tests
async function runTests() {
    console.log("\n--- Search by name ---");
    await searchByName();
    console.log("\n--- Search by category ---");
    await searchByCategory();
    console.log("\n--- Search + sort ---");
    await searchAndSort();
}

runTests();