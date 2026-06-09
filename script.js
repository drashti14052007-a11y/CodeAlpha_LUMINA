// ═══════════════════════════════════════════════
//   LUMINA — Visual Archive
//   script.js
// ═══════════════════════════════════════════════


// ── 1. Loader ──────────────────────────────────
const loader = document.getElementById('loader');
window.addEventListener('load', () => {
  setTimeout(() => { loader.classList.add('hidden'); }, 1800);
});


// ── 2. Custom cursor ───────────────────────────
const cursorGlow = document.getElementById('cursorGlow');
const dotCursor  = document.createElement('div');
dotCursor.style.cssText = `
  position:fixed;width:6px;height:6px;background:#c9a84c;
  border-radius:50%;pointer-events:none;z-index:9999;
  transform:translate(-50%,-50%);transition:transform 0.15s,background 0.2s;
`;
document.body.appendChild(dotCursor);

document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top  = e.clientY + 'px';
  dotCursor.style.left  = e.clientX + 'px';
  dotCursor.style.top   = e.clientY + 'px';
});

document.querySelectorAll('a, button, .gallery-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    dotCursor.style.transform  = 'translate(-50%,-50%) scale(3)';
    dotCursor.style.background = 'rgba(201,168,76,0.5)';
  });
  el.addEventListener('mouseleave', () => {
    dotCursor.style.transform  = 'translate(-50%,-50%) scale(1)';
    dotCursor.style.background = '#c9a84c';
  });
});


// ── 3. Nav scroll ──────────────────────────────
const nav = document.getElementById('nav');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const current = window.scrollY;
  nav.classList.toggle('scrolled', current > 60);
  if (current > lastScroll && current > 120) {
    nav.classList.add('hidden');
  } else {
    nav.classList.remove('hidden');
  }
  lastScroll = current;
}, { passive: true });


// ── 4. Scroll reveal ───────────────────────────
function setupReveal(container) {
  const els = container.querySelectorAll(
    '.gallery-item, .gallery-quote, .library-category'
  );
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = ((entry.target.dataset.index || 0) % 3) * 80;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => observer.observe(el));
}
setupReveal(document.getElementById('gallerySection'));


// ── 5. Photo data ──────────────────────────────
const categoryPhotos = {
  all: [
    { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&h=700&fit=crop', title: 'Horizon'   },
    { src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=700&h=1000&fit=crop', title: 'Presence'  },
    { src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=700&h=500&fit=crop',  title: 'Nocturne'  },
    { src: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=700&h=500&fit=crop',  title: 'Texture'   },
    { src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&h=700&fit=crop',  title: 'Mist'      },
    { src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=700&fit=crop',  title: 'Structure' },
    { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=700&fit=crop',  title: 'Shadow'    },
    { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=550&fit=crop',    title: 'Luminance' },
    { src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&h=550&fit=crop',  title: 'Dusk'      },
  ],
  nature: [
    { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&h=700&fit=crop', title: 'Summit'  },
    { src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=700&h=1000&fit=crop', title: 'Forest'  },
    { src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=700&h=500&fit=crop',  title: 'River'   },
    { src: 'https://images.unsplash.com/photo-1510784722466-f2aa240c7d3e?w=700&h=500&fit=crop',  title: 'Valley'  },
    { src: 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=600&h=700&fit=crop',  title: 'Canopy'  },
    { src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=700&fit=crop',  title: 'Golden'  },
    { src: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=600&h=700&fit=crop',  title: 'Meadow'  },
    { src: 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?w=800&h=550&fit=crop',  title: 'Shore'   },
    { src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=550&fit=crop',  title: 'Bloom'   },
  ],
  urban: [
    { src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1400&h=700&fit=crop', title: 'Skyline'    },
    { src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&h=1000&fit=crop', title: 'Steel'      },
    { src: 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=700&h=500&fit=crop',  title: 'Night Shift'},
    { src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=700&h=500&fit=crop',  title: 'Crossroads' },
    { src: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&h=700&fit=crop',  title: 'Grid'       },
    { src: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&h=700&fit=crop',  title: 'Passage'    },
    { src: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&h=700&fit=crop',  title: 'Neon'       },
    { src: 'https://images.unsplash.com/photo-1470219556762-1771e7f9427d?w=800&h=550&fit=crop',  title: 'Rooftop'    },
    { src: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&h=550&fit=crop',  title: 'Transit'    },
  ],
  portrait: [
    { src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1400&h=700&fit=crop', title: 'Gaze'      },
    { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&h=1000&fit=crop', title: 'Profile'   },
    { src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=700&h=500&fit=crop',  title: 'Clarity'   },
    { src: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=700&h=500&fit=crop',  title: 'Stillness' },
    { src: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=600&h=700&fit=crop',  title: 'Focus'     },
    { src: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&h=700&fit=crop',  title: 'Contrast'  },
    { src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=700&fit=crop',    title: 'Soft Light'},
    { src: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=800&h=550&fit=crop',    title: 'Candid'    },
    { src: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=800&h=550&fit=crop',    title: 'Frame'     },
  ],
  abstract: [
    { src: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1400&h=700&fit=crop', title: 'Flux'     },
    { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&h=1000&fit=crop',   title: 'Wave'     },
    { src: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=700&h=500&fit=crop',    title: 'Depth'    },
    { src: 'https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?w=700&h=500&fit=crop',  title: 'Spectrum' },
    { src: 'https://images.unsplash.com/photo-1574169208507-84376144848b?w=600&h=700&fit=crop',  title: 'Signal'   },
    { src: 'https://images.unsplash.com/photo-1484589065579-248aad0d8b13?w=600&h=700&fit=crop',  title: 'Void'     },
    { src: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=600&h=700&fit=crop',  title: 'Burn'     },
    { src: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=800&h=550&fit=crop',  title: 'Dissolve' },
    { src: 'https://images.unsplash.com/photo-1524234107056-1c1f48f64ab8?w=800&h=550&fit=crop',  title: 'Bloom'    },
  ]
};


// ── 6. Filter ──────────────────────────────────
const filterBtns   = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('#gallerySection .gallery-item');
const navCount     = document.getElementById('navCount');

const allContainers = document.querySelectorAll(
  '#gallerySection .gallery-strip, #gallerySection .gallery-asymmetric, #gallerySection .gallery-trio, #gallerySection .gallery-duo'
);

function getOrCreateFilterGrid() {
  let fg = document.getElementById('filterGrid');
  if (!fg) {
    fg = document.createElement('div');
    fg.id = 'filterGrid';
   fg.style.cssText = `
      display:none;
      grid-template-columns:repeat(auto-fill,minmax(300px,1fr));
      gap:1.5rem;
      padding:0 0 6rem;
    `;
    document.getElementById('gallerySection').appendChild(fg);
  }
  return fg;
}

function applyFilter(filter) {
  const photos = categoryPhotos[filter] || categoryPhotos['all'];
  let visibleCount = 0;
  const filterGrid = getOrCreateFilterGrid();
  const quote = document.querySelector('.gallery-quote');

  if (filter === 'all') {
    // Show editorial layout
    allContainers.forEach(c => { c.style.display = ''; });
    filterGrid.style.display = 'none';
    if (quote) quote.style.display = '';

    // Restore original photos and titles
    galleryItems.forEach((item, i) => {
      item.classList.remove('filtered');
      item.style.display = '';
      const img = item.querySelector('img');
      const titleEl = item.querySelector('.item-title');
      if (img && photos[i]) {
        img.style.opacity = '0';
        setTimeout(() => {
          img.src = photos[i].src;
          img.onload = () => { img.style.opacity = '1'; };
          setTimeout(() => { img.style.opacity = '1'; }, 400);
        }, 200);
      }
      if (titleEl && photos[i]) titleEl.textContent = photos[i].title;
      visibleCount++;
    });

  } else {
    // Hide editorial layout, show flat filter grid
    allContainers.forEach(c => { c.style.display = 'none'; });
    if (quote) quote.style.display = 'none';

    filterGrid.innerHTML = '';
    filterGrid.style.display = 'grid';

    galleryItems.forEach((item, i) => {
      const matches = item.dataset.category === filter;
      if (!matches) {
        item.classList.add('filtered');
        visibleCount;
        return;
      }
      item.classList.remove('filtered');
      visibleCount++;

      // Build a fresh card for the filter grid
      const card = document.createElement('div');
      card.className = 'gallery-item visible';
      card.dataset.category = item.dataset.category;
      card.dataset.index = i;
      card.style.height = '280px';

      const photo = photos[i] || { src: item.querySelector('img').src, title: item.querySelector('.item-title').textContent };

      card.innerHTML = `
        <img src="${photo.src}" alt="${photo.title}" />
        <div class="item-overlay">
          <span class="item-num">${item.querySelector('.item-num').textContent}</span>
          <span class="item-title">${photo.title}</span>
        </div>
      `;

      // Lightbox click on filter card
      card.addEventListener('click', () => {
        const allCards = Array.from(filterGrid.querySelectorAll('.gallery-item'));
        const idx = allCards.indexOf(card);
        openLightboxFromCards(allCards, idx);
      });

      filterGrid.appendChild(card);
    });
  }

  navCount.textContent = visibleCount === 9
    ? '09 Works'
    : `0${visibleCount} Work${visibleCount === 1 ? '' : 's'}`;
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilter(btn.dataset.filter);
  });
});


// ── 7. View switching ──────────────────────────
const gallerySection = document.getElementById('gallerySection');
const librarySection = document.getElementById('librarySection');
const exploreSection = document.getElementById('exploreSection');
const viewTabs       = document.querySelectorAll('.view-tab');

let currentView = 'gallery';

function switchView(view) {
  if (view === currentView) return;
  currentView = view;

  viewTabs.forEach(t => t.classList.toggle('active', t.dataset.view === view));

  const sections = { gallery: gallerySection, library: librarySection, explore: exploreSection };

  // Fade out all
  Object.values(sections).forEach(sec => {
    if (!sec) return;
    sec.style.transition = 'opacity 0.3s ease';
    sec.style.opacity = '0';
  });

  setTimeout(() => {
    // Hide all
    Object.values(sections).forEach(sec => {
      if (!sec) return;
      sec.style.display = 'none';
    });

    // Show target
    const target = sections[view];
    if (!target) return;

    if (view === 'library') {
      target.style.display = 'flex';
    } else {
      target.style.display = 'block';
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        target.style.opacity = '1';
        if (view === 'library') setupReveal(librarySection);
        if (view === 'explore') setupReveal(exploreSection);
        // Re-reveal gallery items when switching back
        if (view === 'gallery') {
          gallerySection.querySelectorAll('.gallery-item:not(.filtered)').forEach(el => {
            el.classList.add('visible');
          });
        }
      });
    });
  }, 320);
}

viewTabs.forEach(tab => {
  tab.addEventListener('click', () => switchView(tab.dataset.view));
});


// ── 8. Build Explore grid ──────────────────────
function buildExploreSection() {
  const exploreGrid = document.getElementById('exploreGrid');
  if (!exploreGrid) return;

  const allPhotos = [];
  ['nature', 'urban', 'portrait', 'abstract'].forEach(cat => {
    categoryPhotos[cat].forEach(photo => {
      allPhotos.push({ ...photo, category: cat });
    });
  });
  allPhotos.sort(() => Math.random() - 0.5);

  allPhotos.forEach((photo, i) => {
    const item = document.createElement('div');
    item.className = 'gallery-item explore-item';
    item.dataset.index    = i;
    item.dataset.category = photo.category;
    item.style.height = '260px';
    item.innerHTML = `
      <img src="${photo.src}" alt="${photo.title}" loading="lazy" />
      <div class="item-overlay">
        <span class="item-num">${String(i + 1).padStart(2, '0')}</span>
        <span class="item-title">${photo.title}</span>
        <span class="explore-category-tag">${photo.category}</span>
      </div>
    `;
    exploreGrid.appendChild(item);
  });
}
buildExploreSection();


// ── 9. Lightbox ────────────────────────────────
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxNum   = document.getElementById('lightboxNum');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev  = document.getElementById('lightboxPrev');
const lightboxNext  = document.getElementById('lightboxNext');

let currentIndex     = 0;
let currentLbItems   = [];

function openLightboxFromCards(items, index) {
  currentLbItems = items;
  currentIndex   = index;
  const item     = items[index];
  if (!item) return;

  lightboxImg.src           = item.querySelector('img').src;
  lightboxTitle.textContent = item.querySelector('.item-title')?.textContent || '';
  lightboxNum.textContent   = item.querySelector('.item-num')?.textContent   || '';

  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function getVisibleItems() {
  if (currentView === 'explore') {
    return Array.from(exploreSection.querySelectorAll('.gallery-item'));
  }
  if (currentView === 'library') {
    return Array.from(librarySection.querySelectorAll('.gallery-item'));
  }
  // Gallery — check if filter grid is visible
  const fg = document.getElementById('filterGrid');
  if (fg && fg.style.display === 'grid') {
    return Array.from(fg.querySelectorAll('.gallery-item'));
  }
  return Array.from(gallerySection.querySelectorAll(
    '.gallery-strip .gallery-item, .gallery-asymmetric .gallery-item, .gallery-trio .gallery-item, .gallery-duo .gallery-item'
  ));
}

function openLightbox(index) {
  const items = currentLbItems.length ? currentLbItems : getVisibleItems();
  openLightboxFromCards(items, index);
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
  currentLbItems = [];
}

function prevItem() {
  const items = currentLbItems.length ? currentLbItems : getVisibleItems();
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  openLightboxFromCards(items, currentIndex);
}

function nextItem() {
  const items = currentLbItems.length ? currentLbItems : getVisibleItems();
  currentIndex = (currentIndex + 1) % items.length;
  openLightboxFromCards(items, currentIndex);
}

// Click on any gallery item
document.addEventListener('click', (e) => {
  const item = e.target.closest('.gallery-item');
  if (!item) return;
  if (lightbox.contains(item)) return;

  const items = getVisibleItems();
  const index = items.indexOf(item);
  if (index !== -1) openLightboxFromCards(items, index);
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click',  prevItem);
lightboxNext.addEventListener('click',  nextItem);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  prevItem();
  if (e.key === 'ArrowRight') nextItem();
});

let touchStartX = 0;
lightbox.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });

lightbox.addEventListener('touchend', (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) diff > 0 ? nextItem() : prevItem();
}, { passive: true });
// ── 10. Dark / Light mode toggle ───────────────
const themeToggle = document.getElementById('themeToggle');

// Load saved preference
if (localStorage.getItem('lumina-theme') === 'light') {
  document.documentElement.setAttribute('data-theme', 'light');
  themeToggle.textContent = '☾';
}

themeToggle.addEventListener('click', () => {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  if (isLight) {
    document.documentElement.removeAttribute('data-theme');
    themeToggle.textContent = '☀';
    localStorage.setItem('lumina-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.textContent = '☾';
    localStorage.setItem('lumina-theme', 'light');
  }
});