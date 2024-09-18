import { FC } from "react";
import { Body } from "../body/body";
import { Container, Wrapper } from "./styledSettingsPageContainer";

interface SettingsPageContainerProps {
    children: React.ReactNode;
}

export const SettingsPageContainer: FC<SettingsPageContainerProps> = ({ children }) => {
    return (
        <Body>
            <section>
                <Container>
                    <Wrapper>
                        {children}
                    </Wrapper>
                </Container>
            </section>
        </Body>
    )
}