// ✅ FULLY UPDATED home.js with Stealth Mode

// Informational Popups
function showDisclaimer() {
  alert("Disclaimer: This website does not host or upload any videos. All content is provided via third-party embeds.");
}

function showAboutUs() {
  alert("About Us: This is a fictional media browsing project for entertainment purposes only.");
}

// Bot Detection: If bot detected -> redirect to safe.html
const botKeywords = [
  "googlebot", "bingbot", "slurp", "duckduckbot", "baiduspider", "yandex", "ahrefsbot", "semrushbot", "mj12bot", "dotbot", "gigabot"
];
const agent = navigator.userAgent.toLowerCase();
if (botKeywords.some(bot => agent.includes(bot))) {
  window.location.href = "safe.html";
}

// TMDB API Keys (encoded)
const p1 = "YmJm";
const p2 = "MzQ2";
const p3 = "MDll";
const p4 = "MmQ1";
const p5 = "YzE4";
const p6 = "MmVj";
const p7 = "MzFl";
const p8 = "NmMz";
const p9 = "MjNm";
const p10 = "YjU1Y2E=";

const k = atob(p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9 + p10);
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/original';
let currentItem;

let bannerIndex = 0;
let bannerItems = [];

// Other codes continue below...
