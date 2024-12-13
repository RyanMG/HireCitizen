import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/sidebar/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'construction-yellow': '#b8972a',
        'construction-yellow-light': '#d4ac2a',
        'blue': '#0B1B39',
        'dark-blue': '#0B0826',
        'light-blue': '#799bd1',
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
