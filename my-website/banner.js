// Configuration (renamed to avoid conflicts)
const TMDB_API_KEY = 'bbf34669e2d5c182ec31e6c323fb55ca';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMG_URL = 'https://image.tmdb.org/t/p/original';

// Banner System
let currentBannerIndex = 0;
let bannerRotationInterval;
let allBannerItems = [];

// 1. Combined Fetch Function
async function fetchAllBannerItems() {
  try {
    // Fetch from both APIs in parallel
    const [meshResults, tmdbResults] = await Promise.all([
      fetchreading('banner'), // Your existing API
      fetch(`${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`)
        .then(res => res.json())
        .then(data => data.results.slice(0, 3))
    ]);

    // Merge and prioritize results
    return [
      ...(meshResults || []),
      ...(tmdbResults || []).map(item => ({
        title: item.title,
        backdrop_path: item.backdrop_path,
        source: 'tmdb'
      }))
    ];
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
}

// 2. Unified Display System
function showBannerItem(item) {
  const banner = document.getElementById('banner');
  const titleEl = document.getElementById('banner-title');
  
  if (!banner || !titleEl) return;

  // Handle both API formats
  const imageUrl = item.backdrop_path 
    ? `${TMDB_IMG_URL}${item.backdrop_path}`
    : item.holdering_path; // Your existing format

  banner.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${imageUrl}')`;
  titleEl.textContent = item.title || item.name;
}

// 3. Smart Rotation System
function startBannerRotation() {
  clearInterval(bannerRotationInterval);
  
  bannerRotationInterval = setInterval(() => {
    currentBannerIndex = (currentBannerIndex + 1) % allBannerItems.length;
    showBannerItem(allBannerItems[currentBannerIndex]);
  }, 5000); // Rotate every 5s
}

// 4. Initialization
document.addEventListener('DOMContentLoaded', async () => {
  allBannerItems = await fetchAllBannerItems();
  if (allBannerItems.length > 0) {
    showBannerItem(allBannerItems[0]);
    startBannerRotation();
  }
  
  // Pause on hover
  const banner = document.getElementById('banner');
  if (banner) {
    banner.addEventListener('mouseenter', () => clearInterval(bannerRotationInterval));
    banner.addEventListener('mouseleave', startBannerRotation);
  }
});
