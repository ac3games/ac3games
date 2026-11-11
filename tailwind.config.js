/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#05020d',
          darker: '#030108',
          card: '#0b061a',
          cardBorder: '#1e1438',
          cyan: '#00f0ff',
          neonPink: '#ff0055',
          neonPurple: '#a855f7',
          neonAmber: '#ffd700',
          neonEmerald: '#10b981',
          plasmaBlue: '#0088ff'
        }
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace']
      },
      boxShadow: {
        'neon-cyan': '0 0 25px rgba(0, 240, 255, 0.45)',
        'neon-pink': '0 0 25px rgba(255, 0, 85, 0.45)',
        'neon-purple': '0 0 25px rgba(168, 85, 247, 0.45)',
        'neon-amber': '0 0 25px rgba(255, 215, 0, 0.45)'
      }
    },
  },
  plugins: [],
}
