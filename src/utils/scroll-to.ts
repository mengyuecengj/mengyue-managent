/**
 * Easing function for smooth animation
 */
function easeInOutQuad(t: number, b: number, c: number, d: number): number {
  t /= d / 2
  if (t < 1) return c / 2 * t * t + b
  t--
  return -c / 2 * (t * (t - 2) - 1) + b
}

/**
 * Cross-browser requestAnimationFrame
 */
const requestAnimFrame: typeof window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.requestAnimationFrame ||
  window.requestAnimationFrame ||
  function (callback) {
    return window.setTimeout(callback, 1000 / 60)
  }

/**
 * Scroll page to specific position
 */
function move(amount: number): void {
  window.scrollTo(0, amount)
}

/**
 * Get current scroll position
 */
function position(): number {
  return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0
}

/**
 * Smooth scroll to target position
 */
export function scrollTo(to: number, duration: number = 500, callback?: () => void): void {
  const start = position()
  const change = to - start
  const increment = 20
  let currentTime = 0

  const animateScroll = function () {
    currentTime += increment
    const val = easeInOutQuad(currentTime, start, change, duration)
    move(val)

    if (currentTime < duration) {
      requestAnimFrame(animateScroll)
    } else {
      callback?.()
    }
  }

  animateScroll()
}
