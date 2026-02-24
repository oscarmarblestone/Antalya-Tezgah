// Menü toggle
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
if (menuToggle && menu) {
  // ensure proper aria state
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

// Scroll animasyonları
const sections = document.querySelectorAll("section");
const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.8;
  sections.forEach(section => {
    const boxTop = section.getBoundingClientRect().top;
    if (boxTop < triggerBottom) section.classList.add("show");
    else section.classList.remove("show");
  });
};
window.addEventListener("scroll", revealOnScroll);

// Form doğrulama (form yoksa atla)
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameEl = form.querySelector("input[type='text']");
    const emailEl = form.querySelector("input[type='email']");
    const messageEl = form.querySelector("textarea");
    const name = nameEl ? nameEl.value.trim() : "";
    const email = emailEl ? emailEl.value.trim() : "";
    const message = messageEl ? messageEl.value.trim() : "";

    if (!name || !email || !message) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Geçerli bir e-posta adresi girin!");
      return;
    }

    alert("Mesajınız başarıyla gönderildi!");
    form.reset();
  });
}

// Slider Galeri (tek, temiz uygulama)
const slides = document.querySelector(".slides");
const images = document.querySelectorAll(".slides img");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let index = 0;
function showSlide(i) {
  if (!slides || images.length === 0) return;
  if (i < 0) index = images.length - 1;
  else if (i >= images.length) index = 0;
  else index = i;
  slides.style.transform = `translateX(${-index * 100}%)`;
}

if (prevBtn) prevBtn.addEventListener("click", () => showSlide(index - 1));
if (nextBtn) nextBtn.addEventListener("click", () => showSlide(index + 1));

setInterval(() => {
  showSlide(index + 1);
}, 4000);

// Dokunmatik swipe desteği
if (slides) {
  let startX = 0;
  slides.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; });
  slides.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) showSlide(index + 1);
    else if (endX - startX > 50) showSlide(index - 1);
  });
}

