module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Ensure this matches your project structure
    './public/index.html', // Include your main HTML file if applicable
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          300: '#93c5fd',
          400: '#60a5fa',
        },
        purple: {
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
        },
        pink: {
          400: '#f472b6',
        },
        blue: {
          400: '#60a5fa',
        },
        purple: {
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
        },
        pink: {
          400: '#f472b6',
        },
        'custom-purple': '#8B5CF6',
        'custom-pink': '#EC4899',
        'light-purple': '#c3b0ff',
        'light-pink': '#ff9ec2',
        'background': '#000000', // Black background
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}