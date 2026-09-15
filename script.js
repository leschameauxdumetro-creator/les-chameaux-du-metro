// ===== Menu mobile =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// ===== Accordéon sponsors (page d'accueil) =====
const sponsorMenu = document.getElementById('sponsorMenu');
if (sponsorMenu) {
  sponsorMenu.querySelectorAll('.sponsor-item').forEach(item => {
    const toggle = item.querySelector('.sponsor-toggle');
    toggle.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      sponsorMenu.querySelectorAll('.sponsor-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });
}

// ===== Filtre du blog par catégorie =====
const filterBar = document.getElementById('filterBar');
const postGrid = document.getElementById('postGrid');
if (filterBar && postGrid) {
  const buttons = filterBar.querySelectorAll('.filter-btn');
  const posts = postGrid.querySelectorAll('.post-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      posts.forEach(post => {
        if (filter === 'tous' || post.dataset.category === filter) {
          post.style.display = '';
        } else {
          post.style.display = 'none';
        }
      });
    });
  });
}