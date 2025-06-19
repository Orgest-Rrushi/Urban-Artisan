// 1. Set current year in footer
document.querySelectorAll('#year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// 2. Image Slider
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

function initSlider() {
  if (!slides.length) return;
  setInterval(nextSlide, 5000);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
}

// 3. Customizer functionality
function initCustomizer() {
  const modelRadios = document.querySelectorAll('input[name="model"]');
  const materialRadios = document.querySelectorAll('input[name="material"]');
  const colorBtns = document.querySelectorAll('.color-btn');
  const detailSlider = document.getElementById('detail-slider');
  const detailValue = document.getElementById('detail-value');
  const totalPrice = document.getElementById('total-price');
  const selectedColor = document.getElementById('selected-color');
  const shoeImage = document.getElementById('shoe-image');

  if (!totalPrice) return; // Only run on customize page

  const prices = { oxford: 199, loafer: 179, sneaker: 149 };
  const materialPrices = { leather: 0, suede: 20, canvas: -30, vegan: 10 };

  function updatePrice() {
    let basePrice = prices[document.querySelector('input[name="model"]:checked').value];
    let materialMod = materialPrices[document.querySelector('input[name="material"]:checked').value];
    let detailsMod = parseInt(detailSlider.value, 10) * 5;
    detailValue.textContent = detailsMod ? `+$${detailsMod}` : '+$0';
    totalPrice.textContent = `$${basePrice + materialMod + detailsMod}`;
  }

  function updateShoeImage() {
    const model = document.querySelector('input[name="model"]:checked').value;
    const color = document.querySelector('.color-btn.active').getAttribute('data-color');
    const material = document.querySelector('input[name="material"]:checked').value;
    shoeImage.src = `https://placehold.co/600x400/e9d8c2/333333?text=${model}+in+${color}+${material}`;
  }

  // Event listeners
  document.querySelectorAll('input[name="model"], input[name="material"]').forEach(el => {
    el.addEventListener('change', () => {
      updatePrice();
      updateShoeImage();
    });
  });

  colorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      colorBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedColor.textContent = `Selected: ${btn.getAttribute('data-color')}`;
      updateShoeImage();
    });
  });

  detailSlider.addEventListener('input', updatePrice);

  const addToCartBtn = document.querySelector('.add-to-cart');
  if (addToCartBtn) addToCartBtn.addEventListener('click', () => {
    alert('Item added to cart! (This is just a demo)');
  });

  // Initialize values
  updatePrice();
  updateShoeImage();
}

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initSlider();
  initCustomizer();
});
