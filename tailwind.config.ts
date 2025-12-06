import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
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
        gold: {
          DEFAULT: "hsl(var(--gold))",
          foreground: "hsl(var(--gold-foreground))",
        },
        luxury: {
          DEFAULT: "hsl(var(--luxury))",
          foreground: "hsl(var(--luxury-foreground))",
        },
        "light-gray": {
          DEFAULT: "hsl(var(--light-gray))",
          foreground: "hsl(var(--light-gray-foreground))",
        },
        earth: {
          DEFAULT: "hsl(var(--earth))",
          foreground: "hsl(var(--earth-foreground))",
        },
        mountain: {
          DEFAULT: "hsl(var(--mountain))",
          foreground: "hsl(var(--mountain-foreground))",
        },
      },
      fontFamily: {
        cinzel: ['Cinzel', 'Georgia', 'serif'],
        playfair: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "slide-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(40px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "shimmer": {
          "0%": {
            backgroundPosition: "-1000px 0"
          },
          "100%": {
            backgroundPosition: "1000px 0"
          }
        },
        "letter-reveal": {
          "0%": {
            opacity: "0",
            transform: "translateY(100%) rotateX(-90deg)",
            filter: "blur(10px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0) rotateX(0deg)",
            filter: "blur(0px)"
          }
        },
        "logo-entrance": {
          "0%": {
            opacity: "0",
            transform: "scale(0.5) rotate(-180deg)"
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.1) rotate(10deg)"
          },
          "100%": {
            opacity: "1",
            transform: "scale(1) rotate(0deg)"
          }
        },
        "glow-pulse": {
          "0%, 100%": {
            filter: "drop-shadow(0 0 20px hsl(var(--primary) / 0.5))"
          },
          "50%": {
            filter: "drop-shadow(0 0 40px hsl(var(--primary) / 0.8))"
          }
        },
        "underline-expand": {
          "0%": {
            transform: "scaleX(0)"
          },
          "100%": {
            transform: "scaleX(1)"
          }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "slide-up": "slide-up 0.8s ease-out",
        "shimmer": "shimmer 3s ease-in-out infinite",
        "letter-reveal": "letter-reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "logo-entrance": "logo-entrance 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "underline-expand": "underline-expand 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
