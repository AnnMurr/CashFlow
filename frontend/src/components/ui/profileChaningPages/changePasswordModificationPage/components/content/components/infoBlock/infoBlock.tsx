import { FC, useContext } from "react";
import { ThemeContextType } from "../../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../../contexts/themeContext/themeContext";
import { Container } from "./styledInfoBlock";

export const InfoBlock: FC = () => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    return (
        <Container themestyles={themeContext.themeStyles}>
            <b> Password strength:</b>
            <span>
                Password must contain at least one digit, one special character '!@#$%^&*', one lowercase letter, one uppercase letter, and should not contain any spaces.
            </span>
        </Container>
    )
}