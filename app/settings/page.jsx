import ThemeChanger from "@/app/component/themeChange";

const SettingsPage=()=> {
    return (
        <div className="flex">
            <h2 className="px-2">Choose your preferred theme:</h2>
            <ThemeChanger />
        </div>
    );
}
export default SettingsPage