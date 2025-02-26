/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
			  atkinson: ['Atkinson Hyperlegible', 'sans-serif'],
			  merchant: ['Merchant', 'serif'],
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
					DEFAULT: '#800000', // Default maroon
					100: '#FFE5E5', // Lightest shade
					200: '#FFB2B2',
					300: '#FF8080',
					400: '#FF4D4D',
					500: '#800000', // Default
					600: '#660000',
					700: '#4D0000',
					800: '#330000',
					900: '#1A0000', // Darkest shade
				  },
				'msu-deep-ocean': '#0A1C37',
				'msu-gold': '#F7D93C',

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
				'xs': '360px',
				'3xl': '1920px',
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


