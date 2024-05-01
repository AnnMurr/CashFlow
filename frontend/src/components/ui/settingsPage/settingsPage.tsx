import { FC } from "react";
import { SubBar } from "../../shared/subBar/subBar";
import { Container, Wrapper } from "./styledSettingsPage";
import { Options } from "./components/options/options";


export const SettingsPage: FC = () => {
    return (
        <section>
        <Container>
            <Wrapper>
                <SubBar />
                <Options />
                {/* <Heading /> */}
                {/* <Body /> */}
            </Wrapper>
        </Container>
    </section>
        )
}