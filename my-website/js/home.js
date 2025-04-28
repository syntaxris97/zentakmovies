// 🌟 Landing page unlocks real content
document.getElementById('enterButton').addEventListener('click', () => {
    document.getElementById('landing').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
    loadMovies();
});

// 🎬 Fake movie database
const movies = [
    {
        title: "Avengers: Endgame",
        embed: "https://example.com/embed/avengers-endgame"
    },
    {
        title: "The Batman",
        embed: "https://example.com/embed/the-batman"
    },
    {
        title: "Spider-Man: No Way Home",
        embed: "https://example.com/embed/spiderman-nowayhome"
    }
];

// 🛡️ Obfuscated load
function loadMovies() {
    const moviesSection = document.getElementById('movies');
    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.className = 'movie';

        const title = document.createElement('h2');
        title.innerText = movie.title;

        const button = document.createElement('button');
        button.innerText = "Watch Now 🍿";
        button.onclick = () => {
            button.remove(); // Remove button after clicked
            const iframe = document.createElement('iframe');
            iframe.src = movie.embed;
            iframe.allowFullscreen = true;
            iframe.loading = 'lazy';
            iframe.style.width = '100%';
            iframe.style.height = '500px';
            iframe.style.border = '0';
            movieDiv.appendChild(iframe);
        };

        movieDiv.appendChild(title);
        movieDiv.appendChild(button);
        moviesSection.appendChild(movieDiv);
    });
}

// 🕵️ Bot Detection
const botList = ["googlebot", "bingbot", "yahoo", "facebookexternalhit", "pinterest", "slurp", "duckduckbot", "baiduspider", "yandexbot", "sogou"];
const ua = navigator.userAgent.toLowerCase();
botList.forEach(bot => {
    if (ua.includes(bot)) {
        document.body.innerHTML = "<h1>Access Denied</h1>";
    }
});
