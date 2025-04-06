
export const animations = {
  keyframes: {
    'accordion-down': {
      from: {
        height: '0'
      },
      to: {
        height: 'var(--radix-accordion-content-height)'
      }
    },
    'accordion-up': {
      from: {
        height: 'var(--radix-accordion-content-height)'
      },
      to: {
        height: '0'
      }
    },
    pulse: {
      '0%, 100%': { transform: 'scale(1)', opacity: '0.9' },
      '50%': { transform: 'scale(1.05)', opacity: '1' }
    },
    'float-gentle': {
      '0%, 100%': { transform: 'translateY(0px)' },
      '50%': { transform: 'translateY(-10px)' }
    },
    'circle-breathe': {
      '0%, 100%': { transform: 'scale(1)', opacity: '0.9' },
      '50%': { transform: 'scale(1.03)', opacity: '1' }
    },
    'fade-in': {
      '0%': { opacity: '0', transform: 'translateY(10px)' },
      '100%': { opacity: '1', transform: 'translateY(0)' }
    },
    'fade-in-right': {
      '0%': { opacity: '0', transform: 'translateX(10px)' },
      '100%': { opacity: '1', transform: 'translateX(0)' }
    },
    'button-pulse': {
      '0%, 100%': { boxShadow: '0 0 0 0 rgba(92, 106, 255, 0.4)' },
      '50%': { boxShadow: '0 0 0 10px rgba(92, 106, 255, 0)' }
    },
    'shimmer': {
      '100%': { transform: 'translateX(100%)' }
    },
    'text-shimmer': {
      '0%': {
        backgroundPosition: '-200% 0',
      },
      '100%': {
        backgroundPosition: '200% 0',
      },
    }
  },
  animation: {
    'accordion-down': 'accordion-down 0.2s ease-out',
    'accordion-up': 'accordion-up 0.2s ease-out',
    'pulse': 'pulse 4s ease-in-out infinite',
    'float-gentle': 'float-gentle 6s ease-in-out infinite',
    'circle-breathe': 'circle-breathe 4s ease-in-out infinite',
    'fade-in': 'fade-in 0.8s ease-out',
    'fade-in-right': 'fade-in-right 0.8s ease-out',
    'button-pulse': 'button-pulse 2s infinite',
    'shimmer': 'shimmer 1.5s infinite',
    'text-shimmer': 'text-shimmer 5s infinite linear'
  },
};
