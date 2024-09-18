import { FC, useContext } from "react";
import { ThemeContextType } from "../../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../../contexts/themeContext/themeContext";
import { SubTitle, Title, Container } from "./styledDescription";

export const Description: FC = () => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    return (
        <Container>
            <Title themestyles={themeContext.themeStyles}>
                <h3>
                    Contact email
                </h3>
            </Title>
            <SubTitle themestyles={themeContext.themeStyles}>
                <h5>
                    The address to which information about the services used in this account is sent.
                </h5>
            </SubTitle>
        </Container>
    )
}