import { FC } from "react";
import { Block, Wrapper } from "./styledChangePasswordPage";
import { SettingsChangingHeader } from "../../../shared/settingsChangingHeader/settingsChangingHeader";
import { Content } from "./components/content/content";

export const ChangePasswordPage: FC = () => {
    return (
        <section>
        <Wrapper>
            <SettingsChangingHeader category={"Password"} />
            <Block>
                <Content />
            </Block>
        </Wrapper>
    </section>
    )
}