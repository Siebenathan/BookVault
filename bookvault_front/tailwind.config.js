/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'black-blacker': '#1E1E1E',
        'rich-black': '#0C1618',
        'verde-green': '#004643',
        'cinza-mais-escuro': '#838175',
        'bege': '#E2D1B3',
        'azul-claro': '#1B98E0',
        'cinza-fraco': '#525252',
        'erin-green': '#05F140'
      },
      boxShadow: {
        '3d-button-shadow': '0px 8px #BEBEBE'
      },
      fontSize: {
        'h1': '47.78px',
        'h2': '39.81px',
        'h3': '33.18px',
        'h4': '27.65px',
        'h5': '23.04px',
        'h6': '19.2px',
        'p': '16px',
        'small': '13.33px',
        'menorletra': '11.11px'
      },
      height: {
        inherit: 'inherit',
      },
    },
  },
  plugins: [],
};
