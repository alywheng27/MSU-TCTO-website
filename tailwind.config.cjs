/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	
	theme: {
		extend: {
			fontFamily: {
			  atkinson: ['Atkinson Hyperlegible', 'sans-serif'],
			  merchant: ['Merchant', 'serif'], 
			  philosopher: ['Philosopher', 'sans-serif'],
			  dirtylane: ['Dirtylane', 'cursive'],
			},
			fontSize: {
			  '178px': '178px',
			  '110px': '110px',
			  '68px': '68px',
			  '42px': '42px',
			  '26px': '26px',
			  '24px': '24px',
			  '16px': '16px',
			  '10px': '10px', // Adding this custom font size
			},
			lineHeight: {
			  '181px': '181px',
			  '112px': '112px',
			  '69px': '69px',
			  '43px': '43px',
			  '32px': '32px',
			  '26px': '26px',
			  '20px': '20px',
			  '16px': '16px',
			  '12px': '12px',
			},
			 
			colors: {
				/* Primary */
				'msu-maroon': {
					DEFAULT: '#61063B', // Default maroon
					100: '#F5E5ED', // Lightest shade
					200: '#E5B8D1',
					300: '#D58BB5',
					400: '#C55E99',
					500: '#61063B', // Default
					600: '#4D052F',
					700: '#3A0423',
					800: '#260317',
					900: '#13020B', // Darkest shade
				  },
				'msu-deep-ocean': '#61063B',
				'msu-main-color': '#61063B',
				'msu-text-color': '#000749',
				'msu-blue-text': '#ffffff',
				'msu-bgc-color': '#ffffff',
				'msu-gold': '#F7D93C',
				'msu-pink': '#ac228a',
				'msu-dark-pink': '#49052c',

				/* Secondary/Light */
				'msu-rusty-red': '#A52930',
				'msu-shallow-ocean': '#1E3070',
				'msu-golden-fog': '#FFEB7B',

				/* Secondary/Dark */
				'msu-crimson-ground': '#C64D53',
				'msu-dark-ocean': '#0C1C59',
				'msu-hidden-gold': '#E3C219',

				/* Mono/Light */
				'white-pure': '#FFFFFF',
				'silver': '#BBBBBB',
				'titanium': '#999999',

				/* Mono/Dark */
				'black-pure': '#111111',
				'charcoal': '#444444',
				'graphite': '#777777',
			},
			screens: {
				'xs': '360px',       /* Small phones (iPhone SE, Android) */
				'pro': '390px',      /* iPhone 12/13/14 Pro */
				'ipad-air': '820px', /* iPad Air 2024 */
				'ipad-pro': '834px', /* iPad Pro 11" */
				'surface': '912px',  /* Surface Pro 7 */
				'3xl': '1920px',
				'90vw': '90vw',
				'95vw': '95vw',
        // 'xs': '360px',
        // 'xl': '1024px',
				// '3xl': '1280px',
				// => @media (min-width: 1536px) { ... }
			  },
			},
		  },
		  variants: {
			extend: {},
		  },
		  plugins: [],
		};


