// Set current year in footer
document.querySelectorAll('#year').forEach(el => {
    el.textContent = new Date().getFullYear();
});

// Image Slider (for other parts of the site, if any)
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentSlide = 0;

function initSlider() {
    if (slides.length === 0) return;
    setInterval(() => {
        nextSlide();
    }, 5000);
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
    
    // Image URLs based on model and color (sample URLs from Unsplash or placeholder)
    const shoeImages = {
        oxford: {
            Black: "https://images.unsplash.com/photo-1528701800489-9b35d9a21f7f?auto=format&fit=crop&w=600&q=80",
            Brown: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80",
            Tan: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80", // reuse brown for tan
            Navy: "https://images.unsplash.com/photo-1528701800489-9b35d9a21f7f?auto=format&fit=crop&w=600&q=80", // fallback to black
            Burgundy: "https://images.unsplash.com/photo-1528701800489-9b35d9a21f7f?auto=format&fit=crop&w=600&q=80",
            Olive: "https://images.unsplash.com/photo-1528701800489-9b35d9a21f7f?auto=format&fit=crop&w=600&q=80"
        },
        loafer: {
            Black: "https://images.unsplash.com/photo-1535968881631-66c7ebc32c8a?auto=format&fit=crop&w=600&q=80",
            Brown: "https://images.unsplash.com/photo-1562157874-97ac36cd04fe?auto=format&fit=crop&w=600&q=80",
            Tan: "https://images.unsplash.com/photo-1562157874-97ac36cd04fe?auto=format&fit=crop&w=600&q=80",
            Navy: "https://images.unsplash.com/photo-1562157874-97ac36cd04fe?auto=format&fit=crop&w=600&q=80",
            Burgundy: "https://images.unsplash.com/photo-1535968881631-66c7ebc32c8a?auto=format&fit=crop&w=600&q=80",
            Olive: "https://images.unsplash.com/photo-1535968881631-66c7ebc32c8a?auto=format&fit=crop&w=600&q=80"
        },
        sneaker: {
            Black: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
            Brown: "https://images.unsplash.com/photo-1552346151-f54c8e0abed7?auto=format&fit=crop&w=600&q=80",
            Tan: "https://images.unsplash.com/photo-1552346151-f54c8e0abed7?auto=format&fit=crop&w=600&q=80",
            Navy: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
            Burgundy: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
            Olive: "https://images.unsplash.com/photo-1552346151-f54c8e0abed7?auto=format&fit=crop&w=600&q=80"
        }
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
        
        // Lookup image url, fallback if needed
        let imgUrl = (shoeImages[model] && shoeImages[model][color]) || 
            "https://placehold.co/600x400/e9d8c2/333333?text=No+Image";
        
        shoeImage.src = imgUrl;
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
            // Material doesn't change image currently
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
    
    // Initialize price and image on page load
    updatePrice();
    updateShoeImage();
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initSlider();
    initCustomizer();
});
