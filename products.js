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

// Ürünleri yükle
const products = [
  { name: "Kırmızı Ayakkabı", image: "resim1.jpg" },
  { name: "Mavi Çanta", image: "resim2.jpg" },
  { name: "Siyah Gözlük", image: "resim3.jpg" },
  { name: "Beyaz Tişört", image: "resim4.jpg" },
  { name: "Yeşil Şapka", image: "resim5.jpg" },
  { name: "Kahverengi Cüzdan", image: "resim6.jpg" },
  { name: "Mor Elbise", image: "resim7.jpg" },
  { name: "Turuncu Mont", image: "resim8.jpg" },
  { name: "Gri Pantolon", image: "resim9.jpg" },
  { name: "Sarı Saat", image: "resim10.jpg" },
  { name: ".....", image: "resim11.jpg" },
  { name: "Lacivert Takım", image: "resim12.jpg" },
  { name: "Krem Ayakkabı", image: "resim13.jpg" },
  { name: "Desenli Etek", image: "resim14.jpg" },
  { name: "Kırmızı Kravat", image: "resim15.jpg" }
];

const productList = document.getElementById("product-list");

if (productList) {
  products.forEach(product => {
    const div = document.createElement("div");
    div.classList.add("product");

    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
    `;

    div.addEventListener("click", () => {
      openModal(product.image);
    });

    productList.appendChild(div);
  });
}

// Modal Fonksiyonları
const modal = document.getElementById("productModal");
const modalImage = document.getElementById("modalImage");
const closeButton = document.querySelector(".close");

function openModal(imageSrc) {
  modalImage.src = imageSrc;
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

closeButton.addEventListener("click", closeModal);

// Modal dışında tıklanınca kapatma
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

// ESC tuşu ile kapatma
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.style.display === "block") {
    closeModal();
  }
});

