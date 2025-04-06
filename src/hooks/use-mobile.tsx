
import * as React from "react"

// Updated to match the required breakpoint
const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    // Initialize with the correct value if window is available
    if (typeof window !== 'undefined') {
      return window.innerWidth < MOBILE_BREAKPOINT
    }
    return false
  })

  React.useEffect(() => {
    // Add resize event listener
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Set initial value
    checkMobile()

    // Setup media query listener
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Use event listener method that works in all browsers
    if (mql.addEventListener) {
      mql.addEventListener("change", checkMobile)
    } else {
      // Fallback for older browsers
      window.addEventListener('resize', checkMobile)
    }
    
    // Clean up
    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", checkMobile)
      } else {
        window.removeEventListener('resize', checkMobile)
      }
    }
  }, [])

  return isMobile
}
