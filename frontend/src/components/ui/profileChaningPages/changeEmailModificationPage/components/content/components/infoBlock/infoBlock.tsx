import { FC, useContext } from "react";
import { ThemeContextType } from "../../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../../contexts/themeContext/themeContext";
import { Container } from "./styledInfoBlock";

export const InfoBlock: FC = () => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    return (
        <Container themestyles={themeContext.themeStyles}>
            <span>
                You're about to update your email address.
                Please ensure that you have access to the new email account,
                as it will be used for future communications.
            </span>
        </Container>
    )
}