import { FC } from "react";
import { Title } from "./components/title/title";
import { ThemeSelection } from "./components/themeSelection/themeSelection";

export const Appearance: FC = () => {
    return (
        <div>
            <Title />
            <ThemeSelection />
        </div>
    )
}