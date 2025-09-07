// Płynne przewijanie (jQuery)
$(document).ready(function() {
    // Efekt fade-in
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => observer.observe(el));

    // Player Radio.co - funkcje
    const initPlayer = () => {
        // Backup player po 5 sekundach
        setTimeout(() => {
            const iframe = document.querySelector('#radio-co-player iframe');
            if (!iframe || iframe.clientHeight === 0) {
                const backupPlayer = document.getElementById('backup-player');
                if (backupPlayer) {
                    backupPlayer.style.display = 'block';
                }
            }
        }, 5000);

        // Aktualny utwór
        function updateNowPlaying() {
            fetch('https://public.radio.co/stations/s18f5220/status')
                .then(response => response.json())
                .then(data => {
                    const nowPlaying = document.getElementById('now-playing');
                    if (nowPlaying) {
                        nowPlaying.innerHTML = 
                            `▶ <strong>${data.current_track.title}</strong> - ${data.current_track.artist}`;
                    }
                })
                .catch(() => {
                    const nowPlaying = document.getElementById('now-playing');
                    if (nowPlaying) {
                        nowPlaying.textContent = "KDWB Online";
                    }
                });
        }

        updateNowPlaying();
        setInterval(updateNowPlaying, 30000);
    };

    // Inicjalizacja tylko na stronie player.html
    if (document.querySelector('#radio-co-player')) {
        initPlayer();
    }
});