import withMT from "@material-tailwind/react/utils/withMT";
//import colors from "@material-tailwind/react/theme/base/colors";
/** @type {import('tailwindcss').Config} */
export default withMT({
  content: ["./src/**/*.{mjs,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        brandOrange: "#ff9900",
      },
    },
  },
  plugins: [],
});
