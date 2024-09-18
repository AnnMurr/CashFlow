import { FC, useContext } from "react";
import { ThemeContextType } from "../../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../../contexts/themeContext/themeContext";
import { Container, InfoText, InfoTitle } from "./styledInfoBlock";

export const InfoBlock: FC = () => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    return (
        <Container>
            <InfoTitle themestyles={themeContext.themeStyles}>
                <h5>
                    Who can see your name
                </h5>
            </InfoTitle>
            <InfoText themestyles={themeContext.themeStyles}>
                <span>
                    Your name will only be visible to you, and no one else
                    will be able to see it,
                    including other users or service administrators.
                </span>
            </InfoText>
        </Container>
    )
}