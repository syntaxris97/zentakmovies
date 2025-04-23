require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

// Proxy endpoint for TMDB API
app.get('/api/movies', async (req, res) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
