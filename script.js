// Mobile menu toggle
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Header scroll effect
const header = document.querySelector('.header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });
}

// Instagram Gallery Loader
async function loadInstagramFeed() {
    const gallery = document.getElementById('instagramGallery');
    if (!gallery) return;

    try {
        // Fetch from our serverless function
        const response = await fetch('/.netlify/functions/instagram');
        
        if (!response.ok) throw new Error('Failed to load gallery');
        
        const posts = await response.json();
        
        gallery.innerHTML = posts.slice(0, 6).map(post => `
            <div class="gallery-item">
                <a href="${post.permalink}" target="_blank" rel="noopener">
                    <img src="${post.media_url}" alt="${post.caption || 'Instagram post'}" loading="lazy">
                </a>
                <p class="gallery-caption">${post.caption ? post.caption.substring(0, 120) + (post.caption.length > 120 ? '...' : '') : ''}</p>
            </div>
        `).join('');
    } catch (error) {
        // Fallback: show placeholder gallery
        gallery.innerHTML = `
            <div class="gallery-item">
                <div class="placeholder-image gallery-placeholder">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                </div>
                <p class="gallery-caption">Great time diving in the Sound of Mull on the west coast of Scotland</p>
            </div>
            <div class="gallery-item">
                <div class="placeholder-image gallery-placeholder">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                </div>
                <p class="gallery-caption">Another great dive trip to Plymouth. Much fun had by all! 🤿🍺</p>
            </div>
            <div class="gallery-item">
                <div class="placeholder-image gallery-placeholder">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                </div>
                <p class="gallery-caption">Lovely sunny weekend for some diving in Portland</p>
            </div>
        `;
    }
}

// Articles Loader (reads from CMS-generated JSON)
async function loadArticles() {
    const grid = document.getElementById('articlesGrid');
    if (!grid) return;

    try {
        const response = await fetch('/articles/index.json');
        if (!response.ok) throw new Error('No articles JSON');
        
        const articles = await response.json();
        
        grid.innerHTML = articles.slice(0, 3).map(article => `
            <article class="article-card">
                <div class="article-image">
                    ${article.image ? `<img src="${article.image}" alt="${article.title}" loading="lazy">` : `
                    <div class="placeholder-image" style="height:200px;border-radius:0;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                    </div>`}
                </div>
                <div class="article-content">
                    <h3>${article.title}</h3>
                    <p>${article.excerpt}</p>
                    <div class="article-meta">
                        <span class="author">${article.author}</span>
                        <span class="date">${article.date}</span>
                    </div>
                </div>
            </article>
        `).join('');
    } catch (error) {
        // Fallback: show sample articles
        grid.innerHTML = `
            <article class="article-card">
                <div class="article-image">
                    <div class="placeholder-image" style="height:200px;border-radius:0;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                    </div>
                </div>
                <div class="article-content">
                    <h3>Portland Weekend May 2026</h3>
                    <p>Mid May saw the first 2026 Mid Herts trip to Portland. Saturday started inauspiciously with one unfortunate diver losing their car key in Portland Harbour!</p>
                    <div class="article-meta">
                        <span class="author">Howard Smith</span>
                        <span class="date">May 14th, 2026</span>
                    </div>
                </div>
            </article>
            <article class="article-card">
                <div class="article-image">
                    <div class="placeholder-image" style="height:200px;border-radius:0;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                    </div>
                </div>
                <div class="article-content">
                    <h3>Cyprus Zenobia Trip May 2026</h3>
                    <p>A week in Cyprus in early May saw a group of Mid Herts Divers heading for warmer waters, wrecks, and Mediterranean sunshine.</p>
                    <div class="article-meta">
                        <span class="author">James Shelford</span>
                        <span class="date">May 3rd, 2026</span>
                    </div>
                </div>
            </article>
            <article class="article-card">
                <div class="article-image">
                    <div class="placeholder-image" style="height:200px;border-radius:0;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                    </div>
                </div>
                <div class="article-content">
                    <h3>NAS April Klein Hollandia Dive</h3>
                    <p>Heading down to Eastbourne to dive the Klein Hollandia and Normans Bay wreck, courtesy of the Nautical Archaeology Society.</p>
                    <div class="article-meta">
                        <span class="author">Howard Smith</span>
                        <span class="date">April 26th, 2026</span>
                    </div>
                </div>
            </article>
        `;
    }
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements after they load
function initAnimations() {
    document.querySelectorAll('.feature-card, .article-card, .benefit-item, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    loadInstagramFeed();
    loadArticles();
    // Delay animations to allow content to load
    setTimeout(initAnimations, 500);
});
