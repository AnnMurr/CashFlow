import { FC } from "react";
import { SettingsChangingHeader } from "../../../shared/settingsChangingHeader/settingsChangingHeader";
import { Content } from "./components/content/content";
import { Block, Wrapper } from "./styledChangePasswordModificationPage";

export const ChangePasswordModificationPage: FC = () => {
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