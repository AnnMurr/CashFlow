import { FC, useContext } from "react";
import { Title } from "./components/title/title";
import { Button } from "./components/button/button";
import { Buttons, Wrapper } from "./styledEmptyState";
import { ThemeContextType } from "../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../contexts/themeContext/themeContext";

export const EmptyState: FC = () => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    return (
        <Wrapper themestyles={themeContext.themeStyles}>
            <Title />
            <Buttons>
                <Button text="Add income" link="/income" />
                <Button text="Add expenses" link="/expenses" />
            </Buttons>
        </Wrapper>
    )
}