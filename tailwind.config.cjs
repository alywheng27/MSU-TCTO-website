/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				merchant: ['Merchant', 'sans-serif'],
				// Add your custom font families here
			},
			colors: {
				/* Primary */
				'msu-maroon': '#75140C;',
				'msu-deep-ocean': '#0A1C37',
				'msu-gold': '#F9D92B',

				/* Secondary/Light */
				'msu-rusty-red': '#8C3F38',
				'msu-shallow-ocean': '#365583',
				'msu-golden-fog': '#FBE776',

				/* Secondary/Dark */
				'msu-crimson-ground': '#420C07',
				'msu-dark-ocean': '#061121',
				'msu-hidden-gold': '#C7AE22',

				/* Mono/Light */
				'white-pure': '#FFFFFF',
				'silver': '#DDDDDD',
				'titanium': '#BBBBBB',

				/* Mono/Dark */
				'black-pure': '#000000',
				'charcoal': '#222222',
				'graphite': '#444444',
			},
			screens: {
				'xsm': '390px',
				'3xl': '1920px',
				// => @media (min-width: 1536px) { ... }
			  }
		},
	},
	plugins: [],
}
