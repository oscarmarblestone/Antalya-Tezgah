// Menü toggle
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

if (menuToggle && menu) {
  menuToggle.setAttribute('aria-expanded', 'false');
  
  menuToggle.addEventListener('click', (e) => {
    const isActive = menu.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    e.stopPropagation();
  });

  // close menu when a link is clicked (mobile)
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth <= 768 && menu.classList.contains('active')) {
        menu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // click outside to close
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !menuToggle.contains(e.target) && menu.classList.contains('active')) {
      menu.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('active')) {
      menu.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.focus();
    }
  });
}
