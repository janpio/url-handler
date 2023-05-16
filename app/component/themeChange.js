"use client";
import { useState, useEffect } from "react";
import { themeChange } from "theme-change";

const ThemeChanger = () => {
    const themes = [
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
        "fav",
    ];
    const [selectedTheme, setSelectedTheme] = useState("night");

    useEffect(() => {
        themeChange(false);
    });

    const handleThemeChange = (event) => {
        console.log(event.target.value);
        setSelectedTheme(event.target.value);
    };

    return (
        <div>
            <select
                id="theme-select"
                value={selectedTheme}
                onChange={handleThemeChange}
                data-choose-theme
            >
                {themes.map((theme) => (
                    <option key={theme} value={theme}>
                        {theme.toUpperCase()}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ThemeChanger;
