/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      // https://ics.media/entry/200317/
      serif: `"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", 
    "BIZ UDPGothic", Meiryo, sans-serif`,
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none", // Unset max-width: 65ch on .prose
            fontSize: "16px",
            letterSpacing: "0.1em",
            textAlign: "justify",
            wordBreak: "break-all",
          },
        },
      },
      aspectRatio: {
        ogp: "1.91 / 1",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
