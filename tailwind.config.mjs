/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      // https://ics.media/entry/200317/
      serif: `"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", 
    "BIZ UDPGothic", Meiryo, sans-serif`,
      quicksand: '"Quicksand Variable", sans-serif',
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
            code: {
              paddingLeft: "0.25rem",
              paddingRight: "0.25rem",
            },
            // Don't insert backticks before and after inline <code>
            "code::before": false,
            "code::after": false,
            // Don't insert quotes before and after <blockquote>
            "blockquote p:first-of-type::before": false,
            "blockquote p:last-of-type::after": false,
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
