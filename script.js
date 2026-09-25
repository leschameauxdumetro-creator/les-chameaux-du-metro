// ===== Menu mobile =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// ===== Accordéon sponsors historique (conservé si présent sur une page) =====
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

// ===== Accordéon "oasis solidaire" (associations) =====
const solidaireDetail = document.getElementById('solidaireDetail');
if (solidaireDetail) {
  solidaireDetail.querySelectorAll('.solidaire-block').forEach(block => {
    const head = block.querySelector('.solidaire-block-head');
    head.addEventListener('click', () => {
      const wasOpen = block.classList.contains('open');
      solidaireDetail.querySelectorAll('.solidaire-block').forEach(b => b.classList.remove('open'));
      if (!wasOpen) block.classList.add('open');
    });
  });
  // Ouvre le premier bloc par défaut
  const first = solidaireDetail.querySelector('.solidaire-block');
  if (first) first.classList.add('open');
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

// ===== Barre latérale à bulles — navigation dans la page index =====
const sideDots = document.getElementById('sideDots');
if (sideDots) {
  const dots = Array.from(sideDots.querySelectorAll('.side-dot'));
  const bubble = sideDots.querySelector('.side-dots-bubble');
  const sections = dots
    .map(dot => document.getElementById(dot.dataset.target))
    .filter(Boolean);

  function moveBubble(index) {
    const dot = dots[index];
    if (!dot || !bubble) return;
    bubble.style.top = (dot.offsetTop + dot.offsetHeight / 2 - 9) + 'px';
  }

  function setActive(index) {
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
    moveBubble(index);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      sections[i].scrollIntoView({ behavior: 'smooth' });
    });
  });

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = sections.indexOf(entry.target);
          if (idx !== -1) setActive(idx);
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

    sections.forEach(sec => observer.observe(sec));
  }

  // ===== Masquer la barre dans le footer =====
  const footer = document.querySelector('.site-footer');
  if (footer && 'IntersectionObserver' in window) {
    const footerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          sideDots.classList.add('footer-hidden');
        } else {
          sideDots.classList.remove('footer-hidden');
        }
      });
    }, { threshold: 0.05 });

    footerObserver.observe(footer);
  }

  window.addEventListener('load', () => setActive(0));
  window.addEventListener('resize', () => {
    const activeIndex = dots.findIndex(d => d.classList.contains('active'));
    moveBubble(activeIndex === -1 ? 0 : activeIndex);
  });
}

// ===== Copier l'adresse mail =====
document.querySelectorAll('.copy-email').forEach(btn => {
  btn.addEventListener('click', async () => {
    const email = btn.dataset.email || 'leschameauxdumetro@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
      const original = btn.dataset.originalText || btn.textContent;
      btn.dataset.originalText = original;
      btn.textContent = 'Adresse copiée !';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove('copied');
      }, 2200);
    } catch (err) {
      window.location.href = 'mailto:' + email;
    }
  });
});

// ===== Formulaire "Devenir sponsor" (ouvre le client mail pré-rempli) =====
const sponsorForm = document.getElementById('sponsorForm');
if (sponsorForm) {
  sponsorForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nom = sponsorForm.nom.value.trim();
    const email = sponsorForm.email.value.trim();
    const entreprise = sponsorForm.entreprise.value.trim();
    const message = sponsorForm.message.value.trim();

    const subject = encodeURIComponent('Devenir sponsor — ' + entreprise);
    const body = encodeURIComponent(
      'Nom / prénom : ' + nom + '\n' +
      'Entreprise : ' + entreprise + '\n' +
      'Email : ' + email + '\n\n' +
      'Message :\n' + message
    );
    window.location.href = 'mailto:leschameauxdumetro@gmail.com?subject=' + subject + '&body=' + body;
  });
}

// ===== Widget de don HelloAsso (modale) =====
(function () {
  const haModal = document.getElementById('haWidgetModal');
  if (!haModal) return;

  const closeHaBtn = document.getElementById('closeHaWidgetBtn');
  const openBtns = document.querySelectorAll('[data-open-ha]');

  function openHaModal() {
    haModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeHaModal() {
    haModal.style.display = 'none';
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openHaModal();
    });
  });

  closeHaBtn?.addEventListener('click', closeHaModal);

  // Ferme en cliquant sur le fond (mais pas sur l'iframe)
  haModal.addEventListener('click', (e) => {
    if (e.target === haModal) closeHaModal();
  });

  // Ferme avec la touche Échap
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && haModal.style.display === 'flex') closeHaModal();
  });
})();

// ===== Galerie "Notre 4L" — lightbox plein écran =====
(function () {
  const lightbox = document.getElementById('l4Lightbox');
  if (!lightbox) return;

  const lightboxImg = document.getElementById('l4LightboxImg');
  const lightboxCaption = document.getElementById('l4LightboxCaption');
  const closeBtn = document.getElementById('l4LightboxClose');
  const prevBtn = document.getElementById('l4LightboxPrev');
  const nextBtn = document.getElementById('l4LightboxNext');

  // Toutes les galeries de la page (extérieur + intérieur) forment une seule série navigable
  const items = Array.from(document.querySelectorAll('.l4-grid-item'));
  let currentIndex = 0;

  function showItem(index) {
    if (!items.length) return;
    currentIndex = (index + items.length) % items.length;
    const item = items[currentIndex];
    lightboxImg.src = item.dataset.full;
    lightboxImg.alt = item.querySelector('img')?.alt || '';
    lightboxCaption.textContent = item.dataset.caption || '';
  }

  function openLightbox(index) {
    showItem(index);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  items.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  closeBtn?.addEventListener('click', closeLightbox);
  prevBtn?.addEventListener('click', () => showItem(currentIndex - 1));
  nextBtn?.addEventListener('click', () => showItem(currentIndex + 1));

  // Ferme en cliquant sur le fond (mais pas sur l'image/les boutons)
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Navigation au clavier
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showItem(currentIndex + 1);
    if (e.key === 'ArrowLeft') showItem(currentIndex - 1);
  });
})();
