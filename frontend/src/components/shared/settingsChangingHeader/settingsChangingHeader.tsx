import { FC, useContext } from "react";
import { BtnGoBack } from "../btnGoBack/btnGoBack";
import { Wrapper, Container, Title } from "./styledSettingsChangingHeader";
import { ThemeContextType } from "../../../contexts/themeContext/types";
import { ThemeContext } from "../../../contexts/themeContext/themeContext";

interface SettingsChangingHeaderProps {
    category: string;
}

export const SettingsChangingHeader: FC<SettingsChangingHeaderProps> = ({ category }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    
    return (
        <Container themestyles={themeContext.themeStyles}>
            <Wrapper>
                <div>
                    <BtnGoBack />
                </div>
                <div>
                    <Title themestyles={themeContext.themeStyles}>
                        <h2>
                            {category}
                        </h2>
                    </Title>
                </div>
            </Wrapper>
        </Container>
    )
}