/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#004e4c",
          "secondary": "#00995d",
          "accent": "#f57921",
          "neutral": "#f2f2f2",
          "base-100": "#fff",
          "base-200": "#f2f2f2",
          "base-content": "#333333",
          "info": "#0ea5e9",
          "success": "#82dd55",
          "warning": "#e23636",
          "error": "#edb95e",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}

