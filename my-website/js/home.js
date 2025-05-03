// ✅ FULLY UPDATED home.js with Stealth Mode
 // ✅ FULLY UPDATED home.js with Stealth Mode + Modals support
 
 // Bot Detection: If bot detected -> redirect to safe.html
 const botKeywords = [
   "googlebot", "bingbot", "slurp", "duckduckbot", "baiduspider", "yandex", "ahrefsbot", "semrushbot", "mj12bot", "dotbot", "gigabot"
 ];
 const agent = navigator.userAgent.toLowerCase();
 if (botKeywords.some(bot => agent.includes(bot))) {
   window.location.href = "safe.html";
 }
 
 const k = "96f19e702988f5aa04d325e08a84c03e";
 const BASE_URL = 'https://api.themoviedb.org/3';
 const IMG_URL = 'https://image.tmdb.org/t/p/original';
 let currentItem;
 
 let bannerIndex = 0;
 let bannerItems = [];
 
 async function fetchTrending(type) {
   const res = await fetch(`${BASE_URL}/trending/${type}/week?api_key=${k}`);
   const data = await res.json();
   return data.results;
 }
 
 async function fetchTrendingAnime() {
   let allResults = [];
   for (let page = 1; page <= 3; page++) {
     const res = await fetch(`${BASE_URL}/trending/tv/week?api_key=${k}&page=${page}`);
     const data = await res.json();
     const filtered = data.results.filter(item =>
       item.original_language === 'ja' && item.genre_ids.includes(16)
     );
     allResults = allResults.concat(filtered);
   }
   return allResults;
 }
 
 function displayBanner(item) {
   document.getElementById('banner').style.backgroundImage = `url(${IMG_URL}${item.backdrop_path})`;
   document.getElementById('banner-title').textContent = item.title || item.name;
 }
 
 function startBannerRotation(items) {
   bannerItems = items;
   displayBanner(bannerItems[bannerIndex]);
   setInterval(() => {
     bannerIndex = (bannerIndex + 1) % bannerItems.length;
     displayBanner(bannerItems[bannerIndex]);
   }, 5000);
 }
 
 function displayList(items, containerId) {
   const container = document.getElementById(containerId);
   container.innerHTML = '';
   items.forEach(item => {
     const card = document.createElement('div');
     card.classList.add('movie-card');
 
     const img = document.createElement('img');
     img.src = `${IMG_URL}${item.poster_path}`;
     img.alt = item.title || item.name;
     img.onclick = () => showDetails(item);
 
     const title = document.createElement('div');
     title.classList.add('movie-title');
     title.textContent = item.title || item.name;
 
     const rating = document.createElement('div');
     rating.classList.add('movie-rating');
     rating.innerHTML = `⭐ ${item.vote_average.toFixed(1)}/10`;
 
     card.appendChild(img);
     card.appendChild(title);
     card.appendChild(rating);
     container.appendChild(card);
   });
 }
 
 function showDetails(item) {
   currentItem = item;
   document.getElementById('modal-title').textContent = item.title || item.name;
   document.getElementById('modal-description').textContent = item.overview;
   document.getElementById('modal-image').src = `${IMG_URL}${item.poster_path}`;
   document.getElementById('modal-rating').innerHTML = '★'.repeat(Math.round(item.vote_average / 2));
   document.getElementById('modal').style.display = 'flex';
   document.getElementById('video-frame').innerHTML = '';
 }
 
 function loadPlayer() {
   const server = document.getElementById('server').value;
   const type = currentItem.media_type === "movie" ? "movie" : "tv";
   const id = currentItem.id;
   let embedURL = "";
 
   if (server === "vidsrc.cc") {
     embedURL = `https://vidsrc.cc/v2/embed/${type}/${id}`;
   } else if (server === "vidsrc.me") {
     embedURL = `https://vidsrc.net/embed/${type}/?tmdb=${id}`;
   } else if (server === "player.videasy.net") {
     embedURL = `https://player.videasy.net/${type}/${id}`;
   }
 
   const encrypted = btoa(embedURL); // Base64 encode
   const iframeSrc = atob(encrypted); // decode back
 
   setTimeout(() => {
     document.getElementById('video-frame').innerHTML =
       `<iframe src="${iframeSrc}" width="100%" height="315" frameborder="0" allowfullscreen></iframe>`;
   }, 800);
 }
 
 function closeModal() {
   document.getElementById('modal').style.display = 'none';
   document.getElementById('video-frame').innerHTML = '';
 function closeModal(modalId = 'modal') {
   document.getElementById(modalId).style.display = 'none';
   if (modalId === 'modal') {
     document.getElementById('video-frame').innerHTML = '';
   }
 }
 
 function openSearchModal() {
   document.getElementById('search-modal').style.display = 'flex';
   document.getElementById('search-input').focus();
 }
 
 function closeSearchModal() {
   document.getElementById('search-modal').style.display = 'none';
   document.getElementById('search-results').innerHTML = '';
 }
 
 async function searchTMDB() {
   const query = document.getElementById('search-input').value;
   if (!query.trim()) {
     document.getElementById('search-results').innerHTML = '';
     return;
   }
 
   const res = await fetch(`${BASE_URL}/search/multi?api_key=${k}&query=${query}`);
   const data = await res.json();
 
   const container = document.getElementById('search-results');
   container.innerHTML = '';
   data.results.forEach(item => {
     if (!item.poster_path) return;
     const img = document.createElement('img');
     img.src = `${IMG_URL}${item.poster_path}`;
     img.alt = item.title || item.name;
     img.onclick = () => {
       closeSearchModal();
       showDetails(item);
     };
     container.appendChild(img);
   });
 }
 
 function showTerms() {
   document.getElementById('termsModal').style.display = 'flex';
 }
 
 function showDisclaimer() {
   document.getElementById('disclaimerModal').style.display = 'flex';
 }
 
 async function init() {
   const movies = await fetchTrending('movie');
   const tvShows = await fetchTrending('tv');
   const anime = await fetchTrendingAnime();
 
   startBannerRotation(movies);
   displayList(movies, 'movies-list');
   displayList(tvShows, 'tvshows-list');
   displayList(anime, 'anime-list');
 }
 
 init();
 
 // Prevent right-click and shortcut keys for extra stealth
 document.addEventListener('contextmenu', e => e.preventDefault());
 document.addEventListener('keydown', e => {
   if (
     e.ctrlKey && (
       ['u', 's', 'c', 'x', 'i', 'j', 'k'].includes(e.key.toLowerCase()) ||
       e.key === 'F12'
     )
   ) {
     e.preventDefault();
   }
 });
 document.addEventListener('dragstart', e => e.preventDefault());
