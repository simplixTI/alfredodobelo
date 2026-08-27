import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Nova paleta 1001 — laranja + amarelo dourado + creme
        brand: {
          orange: "#F26522",
          "orange-deep": "#DC4E12",
          "orange-soft": "#F58245",
          yellow: "#F5B417",
          "yellow-light": "#FCC419",
          "yellow-deep": "#DB9C0F",
          cream: "#FBEDD9",
          "cream-warm": "#F4E4C7",
          "cream-light": "#FFF7E8",
          navy: "#1E2A44",
          "navy-deep": "#0F1A2E",
          ink: "#0F1420",
          white: "#FFFFFF",
        },
        // Legado (mantido para não quebrar componentes que ainda referenciam)
        navy: {
          50: "#EEF2F8",
          100: "#D6DFEE",
          200: "#A8B8D4",
          300: "#7A92BA",
          400: "#4C6CA0",
          500: "#264785",
          600: "#153468",
          700: "#0E2650",
          800: "#1E2A44",
          900: "#0F1A2E",
          950: "#0A1220",
        },
        gold: {
          50: "#FEF7E0",
          100: "#FDECB0",
          200: "#FBD97C",
          300: "#F9C64A",
          400: "#F5B417",
          500: "#F5B417",
          600: "#DB9C0F",
          700: "#A5760A",
          800: "#6E4E06",
          900: "#372703",
        },
        cream: {
          50: "#FFF7E8",
          100: "#FBEDD9",
          200: "#F4E4C7",
          300: "#E8D2A8",
        },
        ink: {
          DEFAULT: "#0F1420",
          soft: "#2A2E36",
          muted: "#5B6270",
        },
      },
      fontFamily: {
        display: ["var(--font-anton)", "Impact", "sans-serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        script: ["var(--font-caveat)", "cursive"],
      },
      letterSpacing: {
        tightest: "-0.045em",
        crisp: "-0.02em",
        wideish: "0.08em",
      },
      boxShadow: {
        card: "0 1px 2px rgba(30,42,68,0.04), 0 12px 32px -12px rgba(30,42,68,0.14)",
        pop: "0 10px 30px -10px rgba(242,101,34,0.55)",
        yellow: "0 10px 30px -10px rgba(245,180,23,0.55)",
        brush: "0 20px 60px -20px rgba(220,78,18,0.4)",
      },
      backgroundImage: {
        grain:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.14 0 0 0 0 0.09 0 0 0 0 0.04 0 0 0 0.35 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        halftone:
          "radial-gradient(circle at 1px 1px, rgba(242,101,34,0.35) 1.2px, transparent 1.5px)",
        "halftone-yellow":
          "radial-gradient(circle at 1px 1px, rgba(245,180,23,0.4) 1.2px, transparent 1.5px)",
        "hero-cream":
          "radial-gradient(1200px 700px at 80% 20%, rgba(245,180,23,0.28), transparent 55%), radial-gradient(900px 600px at 10% 90%, rgba(242,101,34,0.18), transparent 55%), linear-gradient(180deg, #FFF7E8 0%, #FBEDD9 100%)",
        "brush-orange":
          "linear-gradient(120deg, #F26522 0%, #DC4E12 100%)",
        "brush-yellow":
          "linear-gradient(120deg, #FCC419 0%, #F5B417 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "0.55", transform: "scale(1.08)" },
        },
        "spark-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.22,1,0.36,1) both",
        marquee: "marquee 40s linear infinite",
        "pulse-glow": "pulse-glow 3.5s ease-in-out infinite",
        "spark-spin": "spark-spin 12s linear infinite",
      },
    },
  },
  plugins: [typography],
};

export default config;
