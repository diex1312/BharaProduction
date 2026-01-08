// Portfolio Data
const portfolioData = [
    {
        id: 1,
        title: "Acara Pernikahan",
        type: "Wedding",
        description: "Sound system profesional untuk acara pernikahan dengan setup outdoor lengkap",
        image: "Pernikahan.jpg"
    },
    {
        id: 2,
        title: "Ulang Tahun PGRI",
        type: "Community Event",
        description: "Setup sound system untuk perayaan Hari Ulang Tahun PGRI dengan audio crystal clear",
        image: "UlangTahunPGRI1.jpg"
    },
    {
        id: 3,
        title: "Perayaan Hari Guru Nasional",
        type: "Community Event",
        description: "Dukungan audio profesional untuk acara Hari Guru",
        image: "UlangTahunPGRI2.jpg"
    }
];

// NOMOR WHATSAPP (GANTI DENGAN NOMOR ANDA)
const WHATSAPP_NUMBER = '6281226509675'; // Format: 62 + nomor tanpa 0 di depan

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = navToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Smooth Scroll for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Render Portfolio
const portfolioGrid = document.getElementById('portfolioGrid');
if (portfolioGrid) {
    portfolioGrid.innerHTML = portfolioData.map(item => `
        <div class="portfolio-card">
            <div class="portfolio-image">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <span class="portfolio-badge">${item.type}</span>
            </div>
            <div class="portfolio-content">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        </div>
    `).join('');
}

// WhatsApp Floating Button
const whatsappButton = document.getElementById('whatsappButton');
const whatsappPopup = document.getElementById('whatsappPopup');
const popupClose = document.getElementById('popupClose');

// Toggle popup when clicking floating button
whatsappButton.addEventListener('click', () => {
    whatsappPopup.classList.toggle('show');
});

// Close popup
popupClose.addEventListener('click', () => {
    whatsappPopup.classList.remove('show');
});

// Close popup when clicking outside
document.addEventListener('click', (e) => {
    if (!whatsappButton.contains(e.target) && !whatsappPopup.contains(e.target)) {
        whatsappPopup.classList.remove('show');
    }
});

// Open WhatsApp Function
function openWhatsApp(customMessage = '') {
    const defaultMessage = 'Halo Bhara Sound System, saya ingin konsultasi untuk sewa sound system.';
    const message = customMessage || defaultMessage;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    // Buka di tab/window baru
    window.open(whatsappURL, '_blank');
}

// Contact Form Submit
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validasi
        if (!name || !phone || !message) {
            alert('Mohon isi semua field!');
            return;
        }
        
        // Format pesan WhatsApp
        const whatsappMessage = `Halo Bhara Sound System,\n\nNama: ${name}\nNo. HP: ${phone}\n\nPesan:\n${message}`;
        
        // Buka WhatsApp
        openWhatsApp(whatsappMessage);
        
        // Reset form
        contactForm.reset();
        
        // Tampilkan notifikasi
        alert('Anda akan diarahkan ke WhatsApp. Terima kasih!');
    });
}

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements on scroll
document.querySelectorAll('.service-card, .portfolio-card, .feature-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Click to call phone number
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // Izinkan default behavior untuk tel: links
        console.log('Calling:', link.href);
    });
});

// Auto open WhatsApp for all WhatsApp links
document.addEventListener('DOMContentLoaded', () => {
    // Add click handler untuk semua link WhatsApp di halaman
    const waLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]');
    waLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.open(link.href, '_blank');
        });
    });
});