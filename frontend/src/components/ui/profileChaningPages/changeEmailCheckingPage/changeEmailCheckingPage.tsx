import { FC } from "react";
import { SettingsChangingHeader } from "../../../shared/settingsChangingHeader/settingsChangingHeader";
import { Content } from "./components/content/content";
import { Block, Wrapper } from "./styledChangeEmailCheckingPage";

export const ChangeEmailCheckingPage: FC = () => {
    return (
        <section>
            <Wrapper>
                <SettingsChangingHeader category={"Email"} />
                <Block>
                    <Content />
                </Block>
            </Wrapper>
        </section>
    )
}