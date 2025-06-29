document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.partner-slider');
    if (!slider) return;

    const track = slider.querySelector('.slider-track');
    if (!track) return;

    const originalLogos = Array.from(track.children);
    if (originalLogos.length === 0) return;

    // 1. Duplicate all logos to create a seamless, infinitely scrolling track.
    originalLogos.forEach(logo => {
        track.appendChild(logo.cloneNode(true));
    });

    /**
     * Calculates the total width of the logos and sets CSS variables to drive the animation.
     * This makes the animation responsive to changes in logo size or count.
     */
    const setupAnimation = () => {
        // Use the original set of logos for calculation.
        const logosForCalc = Array.from(track.children).slice(0, originalLogos.length);

        let totalWidth = 0;
        logosForCalc.forEach(logo => {
            const style = window.getComputedStyle(logo);
            const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
            totalWidth += logo.offsetWidth + margin;
        });

        // Set CSS variables on the track element.
        // The animation speed can be adjusted by changing the divisor (e.g., 50).
        const animationDuration = totalWidth / 50;
        track.style.setProperty('--scroll-width', `${totalWidth}px`);
        track.style.setProperty('--scroll-duration', `${animationDuration}s`);
    };

    // Initial setup to start the animation.
    setupAnimation();
    track.classList.add('is-animating');

    // Use a debounced resize listener for performance.
    // This will re-calculate the animation if the window size changes.
    let resizeTimer;
    window.addEventListener('resize', () => {
        // Temporarily pause animation during re-calculation to prevent visual glitches.
        track.classList.remove('is-animating');

        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            setupAnimation();
            track.classList.add('is-animating');
        }, 200);
    });
});