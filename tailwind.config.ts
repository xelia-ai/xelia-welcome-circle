
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				sm: '1.5rem',
				md: '2rem'
			},
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				display: ['Montserrat', 'sans-serif'],
				body: ['Poppins', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				xelia: {
					dark: '#0F1012',
					DEFAULT: '#181A1F',
					light: '#1E2026',
					accent: '#3EF3B0',  // Updated to match the brand green accent
					'accent-light': '#5FF5C0', // Lighter shade of brand green
					'accent-dark': '#2AD197', // Darker shade of brand green
					white: '#FFFFFF',
					muted: '#8A8D96',
					'gray-light': '#E0E0E0', // Light gray for subtle borders
					'gray-medium': '#A0A0A0', // Medium gray for unselected states
					'gray-dark': '#3A3A3A', // Dark gray for text and headings
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			spacing: {
				'safe-top': 'env(safe-area-inset-top)',
				'safe-bottom': 'env(safe-area-inset-bottom)',
				'safe-left': 'env(safe-area-inset-left)',
				'safe-right': 'env(safe-area-inset-right)',
			},
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
			boxShadow: {
        'elegant': '0px 10px 30px -5px rgba(0, 0, 0, 0.3)',
        'elegant-sm': '0px 5px 15px -5px rgba(0, 0, 0, 0.2)',
        'elegant-hover': '0px 15px 30px -5px rgba(0, 0, 0, 0.4)',
        'accent': '0px 5px 15px -5px rgba(92, 106, 255, 0.35)',
				'mobile-bottom': '0px -2px 10px rgba(0, 0, 0, 0.3)',
      }
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		function({ addBase, addUtilities, addComponents, theme }) {
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
		},
	],
} satisfies Config;
