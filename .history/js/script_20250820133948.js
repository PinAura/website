// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');

    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Hero showcase carousel
let currentShowcase = 0;
const showcaseCards = document.querySelectorAll('.showcase-card');

function rotateShowcase() {
    showcaseCards.forEach(card => card.classList.remove('active'));
    showcaseCards[currentShowcase].classList.add('active');
    currentShowcase = (currentShowcase + 1) % showcaseCards.length;
}

// Auto-rotate showcase every 3 seconds
setInterval(rotateShowcase, 3000);

// Upload demo simulation
const uploadDemo = document.getElementById('upload-demo');
const uploadArea = uploadDemo.querySelector('.upload-area');
const processingIndicator = document.getElementById('processing');

uploadArea.addEventListener('click', () => {
    simulateUpload();
});

function simulateUpload() {
    uploadArea.style.display = 'none';
    processingIndicator.style.display = 'flex';
    
    setTimeout(() => {
        processingIndicator.style.display = 'none';
        uploadArea.style.display = 'block';
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.className = 'upload-success';
        successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Analysis complete! Your style preferences have been saved.';
        successMsg.style.cssText = `
            background: #10b981;
            color: white;
            padding: 16px;
            border-radius: 8px;
            margin-top: 16px;
            text-align: center;
            animation: fadeIn 0.5s ease-in-out;
        `;
        
        uploadDemo.appendChild(successMsg);
        
        setTimeout(() => {
            successMsg.remove();
        }, 3000);
    }, 2000);
}

// Demo interface functionality
const demoUploadZone = document.getElementById('demo-upload-zone');
const demoFileInput = document.getElementById('demo-file-input');
const generateDesignBtn = document.getElementById('generate-design');
const demoResults = document.getElementById('demo-results');

demoUploadZone.addEventListener('click', () => {
    demoFileInput.click();
});

demoFileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        demoUploadZone.innerHTML = `
            <i class="fas fa-check-circle" style="color: #10b981;"></i>
            <span>${e.target.files.length} image(s) uploaded successfully</span>
        `;
        generateDesignBtn.disabled = false;
    }
});

generateDesignBtn.addEventListener('click', () => {
    generateDesignBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    generateDesignBtn.disabled = true;
    
    setTimeout(() => {
        demoResults.style.display = 'block';
        demoResults.scrollIntoView({ behavior: 'smooth' });
        generateDesignBtn.innerHTML = '<i class="fas fa-magic"></i> Generate Design';
        generateDesignBtn.disabled = false;
    }, 3000);
});

// Gallery filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease-in-out';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Before/After comparison slider
document.querySelectorAll('.comparison-slider').forEach(slider => {
    let isDown = false;
    
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        updateComparison(e, slider);
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        updateComparison(e, slider);
    });
    
    document.addEventListener('mouseup', () => {
        isDown = false;
    });
    
    // Touch events for mobile
    slider.addEventListener('touchstart', (e) => {
        isDown = true;
        updateComparison(e.touches[0], slider);
    });
    
    document.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        updateComparison(e.touches[0], slider);
    });
    
    document.addEventListener('touchend', () => {
        isDown = false;
    });
});

function updateComparison(e, slider) {
    const container = slider.closest('.before-after-container');
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    const afterImage = container.querySelector('.after-image');
    afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    
    slider.style.left = `${percentage}%`;
}

// Pricing toggle
const pricingToggle = document.getElementById('pricing-toggle');
const monthlyPrices = document.querySelectorAll('.monthly-price');
const yearlyPrices = document.querySelectorAll('.yearly-price');

pricingToggle.addEventListener('change', () => {
    if (pricingToggle.checked) {
        monthlyPrices.forEach(price => price.style.display = 'none');
        yearlyPrices.forEach(price => price.style.display = 'inline');
    } else {
        monthlyPrices.forEach(price => price.style.display = 'inline');
        yearlyPrices.forEach(price => price.style.display = 'none');
    }
});

// Load more gallery items
const loadMoreBtn = document.getElementById('load-more');
let loadedItems = 3;

loadMoreBtn.addEventListener('click', () => {
    // Simulate loading more items
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    
    setTimeout(() => {
        // Add more gallery items (in a real app, this would fetch from an API)
        const galleryGrid = document.getElementById('gallery-grid');
        
        for (let i = 0; i < 3; i++) {
            const newItem = createGalleryItem(loadedItems + i + 1);
            galleryGrid.appendChild(newItem);
        }
        
        loadedItems += 3;
        loadMoreBtn.innerHTML = 'Load More Designs';
        
        // Hide button after loading 12 items
        if (loadedItems >= 12) {
            loadMoreBtn.style.display = 'none';
        }
    }, 1500);
});

function createGalleryItem(index) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.setAttribute('data-category', 'living-room');
    
    item.innerHTML = `
        <div class="before-after-container">
            <div class="before-image">
                <img src="assets/gallery-before-${index}.jpg" alt="Before">
                <span class="image-label">Pinterest Inspiration</span>
            </div>
            <div class="after-image">
                <img src="assets/gallery-after-${index}.jpg" alt="After">
                <span class="image-label">AI Generated</span>
            </div>
            <div class="comparison-slider">
                <div class="slider-handle">
                    <i class="fas fa-arrows-alt-h"></i>
                </div>
            </div>
        </div>
        <div class="gallery-info">
            <h4>Design ${index}</h4>
            <p>AI-generated interior design</p>
        </div>
    `;
    
    return item;
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card').forEach(el => {
    observer.observe(el);
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .animate {
        animation: fadeIn 0.6s ease-out forwards;
    }
    
    .nav-menu.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding: 20px;
        gap: 16px;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('PinAura website loaded successfully!');
    
    // Add some interactive hover effects
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
        });
    });
});
