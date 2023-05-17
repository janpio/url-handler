/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    daisyui: {
        styled: true,
        themes: true,
        base: true,
        utils: true,
        logs: true,
        rtl: false,
        prefix: "",
        darkTheme: "dark",
        themes: [
            "light",
            "dark",
            "cupcake",
            "bumblebee",
            "emerald",
            "corporate",
            "synthwave",
            "retro",
            "cyberpunk",
            "valentine",
            "halloween",
            "garden",
            "forest",
            "aqua",
            "lofi",
            "pastel",
            "fantasy",
            "wireframe",
            "black",
            "luxury",
            "dracula",
            "cmyk",
            "autumn",
            "business",
            "acid",
            "lemonade",
            "night",
            "coffee",
            "winter",
            {
                fav: {
                    primary: "#c45fe2",

                    secondary: "#584dd1",

                    accent: "#e05814",

                    neutral: "#261929",

                    "base-100": "#2F2C44",

                    info: "#94BAF0",

                    success: "#5CE0B6",

                    warning: "#FB9918",

                    error: "#F36271",
                },
            },
            {
                mytheme: {
                    primary: "#9fe544",

                    secondary: "#f2b648",

                    accent: "#030191",

                    neutral: "#352A37",

                    "base-100": "#2F3642",

                    info: "#3B5CC9",

                    success: "#1DD7A6",

                    warning: "#FBDE51",

                    error: "#E6376C",
                },
            },
        ],
    },
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
