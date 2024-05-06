import { FC } from "react";
import { SubBar } from "../../shared/subBar/subBar";
import { Options } from "./components/options/options";
import { Container } from "./styledSettingsPage";

export const SettingsPage: FC = () => {
    return (
        <section>
            <Container>
                <div>
                    <SubBar />
                    <Options />
                </div>
            </Container>
        </section>
    )
}