/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        grayish: "#F0F2F5",
        white: "#fcfcfc",
        "blue-50": "#F1F3F9",
        "blue-100": "#DCECFF",
        "blue-200": "#97C4FB",
        "blue-300": "#517ADB",
        "blue-700": "#2750B1",
        "blue-800": "#26418B",
        "blue-900": "#10296E",
        "purple-100": "#F5DDFF",
        "purple-200": "#E0A1FC",
        "purple-300": "#9440B7",
        "purple-700": "#9440B7",
        "purple-800": "#6F009D",
        "purple-900": "#510074",
        "warning-200": "#F7C164",
        "warning-600": "#AD6F07",
        "warning-700": "#865503",
        "warning-800": "#664101",
        "warning-900": "#523300",
        "error-200": "#E26E6A",
        "error-600": "#BA110B",
        "error-700": "#9E0A05",
        "error-800": "#800501",
        "error-900": "#591000",
        "shadow-xl":
          "box-shadow: 0px 8px 8px -4px #10192808,0px 24px 32px -4px #10192814",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
    },
    fontFamily: {
      openSans: ["Open Sans", "sans-serif"],
    },
  },
  plugins: [],
};
