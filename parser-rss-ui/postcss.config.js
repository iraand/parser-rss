import tailwindcss from "tailwindcss";
export const plugins = [
 tailwindcss("./tailwind.js"),
 require("autoprefixer"),
 "postcss-preset-env",
];
