/* -------------------------------------------------------------
   RedlineAI Interactive Logic
   ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    const iframe = document.getElementById('fillout-iframe');
    const loader = document.getElementById('form-loader');

    if (iframe && loader) {
        // Hide loader and show iframe when loading completes
        iframe.addEventListener('load', () => {
            // Smooth fade out of the loader
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500); // match CSS duration

            // Smooth fade in of the iframe
            iframe.style.opacity = '1';
        });

        // Fallback: If the iframe takes too long to notify load, reveal it
        setTimeout(() => {
            if (loader.style.opacity !== '0') {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
                iframe.style.opacity = '1';
            }
        }, 6000); // 6 second safety net
    }

    // Dynamic Orb Parallax Effect on Mouse Move
    const orb1 = document.querySelector('.orb-1');
    const orb2 = document.querySelector('.orb-2');

    if (orb1 || orb2) {
        window.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            // Calculate percentage across the screen
            const percentX = (mouseX / window.innerWidth) - 0.5;
            const percentY = (mouseY / window.innerHeight) - 0.5;

            // Calculate translations (subtle, non-distracting offsets)
            const offsetX1 = percentX * 45;
            const offsetY1 = percentY * 45;
            const offsetX2 = percentX * -35;
            const offsetY2 = percentY * -35;

            if (orb1) {
                orb1.style.transform = `translate(${offsetX1}px, ${offsetY1}px)`;
            }
            if (orb2) {
                orb2.style.transform = `translate(${offsetX2}px, ${offsetY2}px)`;
            }
        });
    }

    // Header styling shift on scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5), 0 1px 0 rgba(255, 42, 59, 0.05)';
                header.style.backgroundColor = 'rgba(6, 6, 8, 0.9)';
            } else {
                header.style.boxShadow = 'none';
                header.style.backgroundColor = 'var(--bg-nav)';
            }
        });
    }
});
