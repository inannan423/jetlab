const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./mdx-components.tsx",
		"content/**/*.mdx",
	],

	theme: {
    	extend: {
    		typography: {
    			DEFAULT: {
    				css: {
    					'code::before': {
    						content: '"'
    					},
    					'code::after': {
    						content: '"'
    					}
    				}
    			},
    			quoteless: {
    				css: {
    					'blockquote p:first-of-type::before': {
    						content: 'none'
    					},
    					'blockquote p:first-of-type::after': {
    						content: 'none'
    					}
    				}
    			}
    		},
    		fontFamily: {
    			sans: [
    				'var(--font-inter)',
                    ...defaultTheme.fontFamily.sans
                ],
    			display: [
    				'var(--font-calsans)'
    			]
    		},
    		backgroundImage: {
    			'gradient-radial': 'radial-gradient(50% 50% at 50% 50%, var(--tw-gradient-stops))'
    		},
    		animation: {
    			'fade-in': 'fade-in 3s ease-in-out forwards',
    			title: 'title 3s ease-out forwards',
    			'fade-left': 'fade-left 3s ease-in-out forwards',
    			'fade-right': 'fade-right 3s ease-in-out forwards'
    		},
    		keyframes: {
    			'fade-in': {
    				'0%': {
    					opacity: '0%'
    				},
    				'75%': {
    					opacity: '0%'
    				},
    				'100%': {
    					opacity: '100%'
    				}
    			},
    			'fade-left': {
    				'0%': {
    					transform: 'translateX(100%)',
    					opacity: '0%'
    				},
    				'30%': {
    					transform: 'translateX(0%)',
    					opacity: '100%'
    				},
    				'100%': {
    					opacity: '0%'
    				}
    			},
    			'fade-right': {
    				'0%': {
    					transform: 'translateX(-100%)',
    					opacity: '0%'
    				},
    				'30%': {
    					transform: 'translateX(0%)',
    					opacity: '100%'
    				},
    				'100%': {
    					opacity: '0%'
    				}
    			},
    			title: {
    				'0%': {
    					'line-height': '0%',
    					'letter-spacing': '0.25em',
    					opacity: '0'
    				},
    				'25%': {
    					'line-height': '0%',
    					opacity: '0%'
    				},
    				'80%': {
    					opacity: '100%'
    				},
    				'100%': {
    					'line-height': '100%',
    					opacity: '100%'
    				}
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		}
    	}
    },
	plugins: [
		require("@tailwindcss/typography"),
		require("tailwindcss-debug-screens"),
        require("tailwindcss-animate")
    ],
};
