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
				'msu-maroon': '#820D13;',
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
			  }
		},
	},
	plugins: [],
}
