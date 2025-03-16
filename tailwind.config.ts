import type { Config } from "tailwindcss";

export default {
	darkMode: "class",
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/_shared/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: "#484E53",
					dark: "#E1E1E1",
				},
				secondary: {
					DEFAULT: "#4FC3F7",
					dark: "#4FC3F7",
				},
				background: {
					DEFAULT: "#E0E8F6",
					dark: "#1A1A1A",
				},
			},
			screens: {
				mobile: "320px",
				tablet: "481px",
				laptop: "769px",
				desktop: "1025px",
				wide: "1201px",
			},
		},
	},
	plugins: [],
} satisfies Config;
