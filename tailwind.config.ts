import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        hazard: {
          flood: "#1d4ed8",
          road: "#f59e0b",
          accident: "#dc2626",
          fire: "#ea580c",
          power: "#9333ea"
        }
      }
    }
  },
  plugins: []
};

export default config;
