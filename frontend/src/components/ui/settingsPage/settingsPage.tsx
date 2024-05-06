import { FC } from "react";
import { SubBar } from "../../shared/subBar/subBar";
import { Options } from "./components/options/options";
import { Container, Wrapper } from "./styledSettingsPage";

export const SettingsPage: FC = () => {
    return (
        <section>
            <Container>
                <Wrapper>
                    <SubBar />
                    <Options />
                </Wrapper>
            </Container>
        </section>
    )
}