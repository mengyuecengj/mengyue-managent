/**
 * Easing function for smooth animation
 */
function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1)
        return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
}
/**
 * Cross-browser requestAnimationFrame
 */
const requestAnimFrame = window.requestAnimationFrame ||
    window.requestAnimationFrame ||
    window.requestAnimationFrame ||
    function (callback) {
        return window.setTimeout(callback, 1000 / 60);
    };
/**
 * Scroll page to specific position
 */
function move(amount) {
    window.scrollTo(0, amount);
}
/**
 * Get current scroll position
 */
function position() {
    return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
}
/**
 * Smooth scroll to target position
 */
export function scrollTo(to, duration = 500, callback) {
    const start = position();
    const change = to - start;
    const increment = 20;
    let currentTime = 0;
    const animateScroll = function () {
        currentTime += increment;
        const val = easeInOutQuad(currentTime, start, change, duration);
        move(val);
        if (currentTime < duration) {
            requestAnimFrame(animateScroll);
        }
        else {
            callback?.();
        }
    };
    animateScroll();
}
