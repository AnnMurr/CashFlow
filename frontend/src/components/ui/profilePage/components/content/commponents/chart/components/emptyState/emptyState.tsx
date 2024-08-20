import { FC, useContext } from "react";
import { Title } from "./components/title/title";
import { Button } from "./components/button/button";
import { ThemeContextType } from "../../../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../../../contexts/themeContext/themeContext";
import { Buttons, Wrapper } from "./styledEmptyState";

interface EmptyStateProps {
    statisticType: "expenses" | "income";
}

export const EmptyState: FC<EmptyStateProps> = ({ statisticType }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    return (
        <Wrapper themestyles={themeContext.themeStyles}>
            <Title />
            <Buttons>
                {statisticType === "income" && <Button text="Add income" link="/income" />}
                {statisticType === "expenses" && <Button text="Add expenses" link="/expenses" />}
            </Buttons>
        </Wrapper>
    )
}