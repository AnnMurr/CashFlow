import { FC } from "react";
import { Title } from "./components/title/title";
import { ThemeSelection } from "./components/themeSelection/themeSelection";
import { Container } from "./styledAppearance";

export const Appearance: FC = () => {
    return (
        <Container>
            <Title />
            <ThemeSelection />
        </Container>
    )
}