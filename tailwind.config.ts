import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'construction-yellow': '#b8972a',
        'construction-yellow-light': '#d4ac2a',
        'blue': '#0B1B39',
        'dark-blue': '#0B0826',
        'light-blue': '#799bd1'
      },
    },
  },
  plugins: [],
};
export default config;
