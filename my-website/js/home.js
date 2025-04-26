// 📜 Stealth Mode JS

function showDisclaimer() {
  alert("Disclaimer: Educational use only. No media hosted here.");
}

function showAbout() {
  alert("About: Fictional media platform for browsing only.");
}

const k = 'bbf34609e2d5c182ec31e6c323fb55ca';
const b = 'https://api.themoviedb.org/3';
const i = 'https://image.tmdb.org/t/p/original';
let z;

let y = 0;
let w = [];

async function ft(t) {
  const r = await fetch(`${b}/trending/${t}/week?api_key=${k}`);
  const d = await r.json();
  return d.results;
}

async function fa() {
  let a = [];
  for (let p = 1; p <= 3; p++) {
    const r = await fetch(`${b}/trending/tv/week?api_key=${k}&page=${p}`);
    const d = await r.json();
    const f = d.results.filter(x =>
      x.original_language === 'ja' && x.genre_ids.includes(16)
    );
    a = a.concat(f);
  }
  return a;
}

function db(item) {
  document.getElementById('banner').style.backgroundImage = `url(${i}${item.backdrop_path})`;
  document.getElementById('banner-title').textContent = item.title || item.name;
}

function br(items) {
  w = items;
  db(w[y]);
  setInterval(() => {
    y = (y + 1) % w.length;
    db(w[y]);
  }, 5000);
}

function dl(items, cid) {
  const c = document.getElementById(cid);
  c.innerHTML = '';
  items.forEach(it => {
    const d = document.createElement('div');
    d.classList.add('movie-card');

    const img = document.createElement('img');
    img.src = `${i}${it.poster_path}`;
    img.alt = it.title || it.name;
    img.onclick = () => sd(it);

    const t = document.createElement('div');
    t.classList.add('movie-title');
    t.textContent = it.title || it.name;

    const r = document.createElement('div');
    r.classList.add('movie-rating');
    r.innerHTML = `⭐ ${it.vote_average.toFixed(1)}/10`;

    d.appendChild(img);
    d.appendChild(t);
    d.appendChild(r);
    c.appendChild(d);
  });
}

function sd(it) {
  z = it;
  document.getElementById('modal-title').textContent = it.title || it.name;
  document.getElementById('modal-description').textContent = it.overview;
  document.getElementById('modal-image').src = `${i}${it.poster_path}`;
  document.getElementById('modal-rating').innerHTML = '★'.repeat(Math.round(it.vote_average / 2));
  document.getElementById('modal').style.display = 'flex';
  document.getElementById('video-frame').innerHTML = '';
}

function lp() {
  const s = document.getElementById('server').value;
  const t = z.media_type === "movie" ? "movie" : "tv";
  const id = z.id;
  let e = "";

  if (s === "vidsrc.cc") {
    e = `https://vidsrc.cc/v2/embed/${t}/${id}`;
  } else if (s === "vidsrc.me") {
    e = `https://vidsrc.net/embed/${t}/?tmdb=${id}`;
  } else if (s === "player.videasy.net") {
    e = `https://player.videasy.net/${t}/${id}`;
  }

  setTimeout(() => {
    document.getElementById('video-frame').innerHTML = 
    `<iframe src="${e}" width="100%" height="315" frameborder="0" allowfullscreen></iframe>`;
  }, 800);
}

function cm() {
  document.getElementById('modal').style.display = 'none';
  document.getElementById('video-frame').innerHTML = '';
}

function osm() {
  document.getElementById('search-modal').style.display = 'flex';
  document.getElementById('search-input').focus();
}

function csm() {
  document.getElementById('search-modal').style.display = 'none';
  document.getElementById('search-results').innerHTML = '';
}

async function stm() {
  const q = document.getElementById('search-input').value;
  if (!q.trim()) {
    document.getElementById('search-results').innerHTML = '';
    return;
  }

  const r = await fetch(`${b}/search/multi?api_key=${k}&query=${q}`);
  const d = await r.json();

  const c = document.getElementById('search-results');
  c.innerHTML = '';
  d.results.forEach(it => {
    if (!it.poster_path) return;
    const img = document.createElement('img');
    img.src = `${i}${it.poster_path}`;
    img.alt = it.title || it.name;
    img.onclick = () => {
      csm();
      sd(it);
    };
    c.appendChild(img);
  });
}

async function init() {
  const m = await ft('movie');
  const tv = await ft('tv');
  const an = await fa();

  br(m);
  dl(m, 'movies-list');
  dl(tv, 'tvshows-list');
  dl(an, 'anime-list');
}

init();

document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
  if (e.ctrlKey && (['u', 's', 'c', 'x', 'i', 'j', 'k'].includes(e.key.toLowerCase()) || e.key === 'F12')) {
    e.preventDefault();
  }
});
document.addEventListener('dragstart', e => e.preventDefault());
