// Set current year in footer
document.querySelectorAll('#year').forEach(el => {
    el.textContent = new Date().getFullYear();
});

// Image Slider
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentSlide = 0;

// Initialize slider
function initSlider() {
    if (slides.length === 0) return; // No slides found
    
    // Set up automatic sliding
    setInterval(() => {
        nextSlide();
    }, 5000);
    
    // Add click events to buttons
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
}

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

// Customizer functionality
function initCustomizer() {
    const modelRadios = document.querySelectorAll('input[name="model"]');
    const materialRadios = document.querySelectorAll('input[name="material"]');
    const colorBtns = document.querySelectorAll('.color-btn');
    const detailSlider = document.getElementById('detail-slider');
    const detailValue = document.getElementById('detail-value');
    const totalPrice = document.getElementById('total-price');
    const selectedColor = document.getElementById('selected-color');
    const shoeImage = document.getElementById('shoe-image');
    
    if (!totalPrice) return; // Not on customizer page
    
    // Base prices
    const prices = {
        oxford: 199,
        loafer: 179,
        sneaker: 149
    };
    
    // Material price modifiers
    const materialPrices = {
        leather: 0,
        suede: 20,
        canvas: -30,
        vegan: 10
    };
    
    // Update total price
    function updatePrice() {
        let basePrice = 199; // Default
        let materialMod = 0;
        let detailsMod = 0;
        
        // Get selected model price
        modelRadios.forEach(radio => {
            if (radio.checked) {
                basePrice = prices[radio.value];
            }
        });
        
        // Get material price modifier
        materialRadios.forEach(radio => {
            if (radio.checked) {
                materialMod = materialPrices[radio.value];
            }
        });
        
        // Get details price modifier
        detailsMod = parseInt(detailSlider.value) * 5;
        
        // Update detail value display
        detailValue.textContent = detailsMod > 0 ? `+$${detailsMod}` : '+$0';
        
        // Calculate and display total
        const total = basePrice + materialMod + detailsMod;
        totalPrice.textContent = `$${total}`;
    }
    
    // Update shoe image based on selections
    function updateShoeImage() {
        let model = 'oxford';
        let color = 'Black';
        let material = 'leather';
        
        // Get selected model
        modelRadios.forEach(radio => {
            if (radio.checked) model = radio.value;
        });
        
        // Get selected color
        colorBtns.forEach(btn => {
            if (btn.classList.contains('active')) {
                color = btn.getAttribute('data-color');
            }
        });
        
        // Get selected material
        materialRadios.forEach(radio => {
            if (radio.checked) material = radio.value;
        });
        
        // In a real app, you would change to a different image based on selections
        // For this demo, we'll just update the placeholder text
        shoeImage.src = `https://placehold.co/600x400/e9d8c2/333333?text=${model}+in+${color}+${material}`;
    }
    
    // Set up event listeners
    modelRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            updatePrice();
            updateShoeImage();
        });
    });
    
    materialRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            updatePrice();
            updateShoeImage();
        });
    });
    
    colorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            colorBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            // Update selected color text
            selectedColor.textContent = `Selected: ${btn.getAttribute('data-color')}`;
            updateShoeImage();
        });
    });
    
    detailSlider.addEventListener('input', () => {
        updatePrice();
    });
    
    // Add to cart button
    const addToCartBtn = document.querySelector('.add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            alert('Item added to cart! (This is just a demo)');
        });
    }
    
    // Initialize price
    updatePrice();
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initSlider();
    initCustomizer();
});
