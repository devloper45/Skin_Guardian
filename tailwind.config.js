/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      screens: {
        xsm: "250px",
        sm: "480px",
        md: "768px",
        lg: "1024px",
        xl: "1536px",
      },
      boxShadow: {
        customshadow: "0 25px 50px -12px rgba(21, 36, 26, 0.75)", // Adjust the shadow properties as needed
      },
      colors: {
        primaryColor: "#eb456a",
        primary: "#2196f3", // bg-blue-500
        InputColor: "#0066FF",
        InputColorHover: "#5998f7",
        White: "#000000",
      },
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
        custom: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
      },
      backgroundImage: {
        "landing-page": "url('srcassets\bg.avif')", // Adjust the path to your image
      },
    },
  },
  plugins: [],
};
