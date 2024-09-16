import { FC, useContext } from "react";
import { Title } from "./components/title/title";
import { Button } from "./components/button/button";
import { ThemeContextType } from "../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../contexts/themeContext/themeContext";
import { Wrapper } from "./styledEmptyState";


export const EmptyState: FC = () => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    return (
        <Wrapper themestyles={themeContext.themeStyles}>
            <Title />
            <Button text="Add plan" link="/budget-planner" />
        </Wrapper>
    )
}