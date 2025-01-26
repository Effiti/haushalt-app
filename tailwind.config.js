/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import { addIconSelectors } from "@iconify/tailwind";
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,json}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    typography,
    daisyui,
    addIconSelectors(['iconoir', 'material-symbols', 'clarity', 'pajamas', 'proicons', 'emojione-v1', 'game-icons', 'gravity-ui', 'fluent', 'streamline'])
  ],
}

