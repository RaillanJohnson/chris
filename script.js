// Gérer la persistance de la musique entre les pages
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('backgroundMusic');
    
    if (audio) {
        // Restaurer le temps de lecture sauvegardé
        const savedTime = sessionStorage.getItem('musicTime');
        const wasPlaying = sessionStorage.getItem('musicPlaying') === 'true';
        
        if (savedTime) {
            audio.currentTime = parseFloat(savedTime);
        }
        
        // Relancer la musique si elle était en cours
        if (wasPlaying) {
            audio.play();
        }
        
        // Quand on quitte la page, sauvegarder l'état
        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('musicTime', audio.currentTime);
            sessionStorage.setItem('musicPlaying', !audio.paused);
        });
        
        // Sauvegarder régulièrement pour plus de sécurité
        setInterval(() => {
            sessionStorage.setItem('musicTime', audio.currentTime);
            sessionStorage.setItem('musicPlaying', !audio.paused);
        }, 1000);
    }
    
    attachEventListeners();
});

// Attacher les écouteurs
function attachEventListeners() {
    const wishInput = document.getElementById('wishInput');
    if (wishInput) {
        wishInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                submitWish();
            }
        });
    }
}

// Redirection vers la page des souhaits
function redirectToWishes() {
    window.location.href = 'wishes.html';
}

// Redirection vers la galerie
function redirectToGallery() {
    window.location.href = 'gallery.html';
}

// Retour à la page d'accueil
function goBack() {
    window.location.href = 'index.html';
}

// Contrôle de la musique
function toggleMusic() {
    const audio = document.getElementById('backgroundMusic');
    const btn = document.getElementById('musicBtn');
    
    if (audio.paused) {
        audio.play();
        btn.textContent = '🔊 Musique ON';
    } else {
        audio.pause();
        btn.textContent = '🔇 Musique OFF';
    }
}

// Retour à la page d'accueil
function goBack() {
    window.location.href = 'index.html';
}

// Soumettre un souhait
function submitWish() {
    const wishInput = document.getElementById('wishInput');
    const wishMessage = document.getElementById('wishMessage');
    
    if (wishInput.value.trim() === '') {
        alert('Écris ton souhait d\'abord ! 😊');
        return;
    }
    
    // Affiche le message de confirmation
    wishMessage.style.display = 'block';
    
    // Efface le texte après 3 secondes
    setTimeout(() => {
        wishInput.value = '';
        wishMessage.style.display = 'none';
    }, 3000);
}

// Lightbox pour les images
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = src;
    lightbox.classList.add('active');
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
}

// Fermer la lightbox avec la touche Échap
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// Feux d'artifice
function createFireworks() {
    const container = document.getElementById('confetti-container');
    if (!container) return;
    
    const colors = ['#ff6b6b', '#f093fb', '#f5576c', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7'];
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * (window.innerHeight * 0.5);
            
            for (let j = 0; j < 12; j++) {
                const particle = document.createElement('div');
                const angle = (j / 12) * Math.PI * 2;
                const velocity = 5 + Math.random() * 5;
                const tx = Math.cos(angle) * velocity * 50;
                const ty = Math.sin(angle) * velocity * 50;
                
                particle.className = 'firework';
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                particle.style.setProperty('--tx', tx + 'px');
                particle.style.setProperty('--ty', ty + 'px');
                particle.style.color = colors[Math.floor(Math.random() * colors.length)];
                particle.innerHTML = '✨';
                particle.style.fontSize = '20px';
                
                container.appendChild(particle);
                
                setTimeout(() => particle.remove(), 1000);
            }
        }, i * 300);
    }
}

// Lancer les feux d'artifice au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(createFireworks, 500);
    
    // Relancer toutes les 5 secondes
    setInterval(createFireworks, 8000);
});
  


