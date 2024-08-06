import { FC } from "react";
import { SettingsChangingHeader } from "../../../shared/settingsChangingHeader/settingsChangingHeader";
import { Body } from "../../../shared/body/body";
import { Content } from "./components/content/content";
import { Block, Wrapper } from "./styledChangeEmailCheckingPage";

export const ChangeEmailCheckingPage: FC = () => {
    return (
        <Body>
            <section>
                <Wrapper>
                    <SettingsChangingHeader category={"Email"} />
                    <Block>
                        <Content />
                    </Block>
                </Wrapper>
            </section>
        </Body>
    )
}