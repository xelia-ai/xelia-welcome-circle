
export function components({ addBase, addUtilities, addComponents, theme }: any) {
  // Add base styles for better mobile experience
  addBase({
    // Improve touch area for interactive elements
    'button, .touch-target': {
      '@media (max-width: 640px)': {
        minHeight: '44px',
        minWidth: '44px',
      },
    },
    // Improved font rendering
    'html, body': {
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      'text-rendering': 'optimizeLegibility',
    },
  });

  // Add utilities for mobile-specific needs
  addUtilities({
    '.pb-safe': {
      paddingBottom: `max(env(safe-area-inset-bottom), 1.5rem)`,
    },
    '.pt-safe': {
      paddingTop: `max(env(safe-area-inset-top), 1rem)`,
    },
    '.mobile-full-width': {
      '@media (max-width: 640px)': {
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
      },
    },
    '.tap-highlight-none': {
      '-webkit-tap-highlight-color': 'transparent',
    },
    '.touch-pan-y': {
      'touch-action': 'pan-y',
    },
    '.touch-pan-x': {
      'touch-action': 'pan-x',
    },
  });

  // Add components for mobile scenarios
  addComponents({
    '.sticky-header': {
      position: 'sticky',
      top: '0',
      zIndex: '40',
      backdropFilter: 'blur(8px)',
      '@media (max-width: 640px)': {
        paddingTop: 'max(env(safe-area-inset-top), 0.5rem)',
      },
    },
    '.sticky-bottom': {
      position: 'sticky',
      bottom: '0',
      zIndex: '40',
      backdropFilter: 'blur(8px)',
      '@media (max-width: 640px)': {
        paddingBottom: 'max(env(safe-area-inset-bottom), 0.5rem)',
      },
    },
  });
}
