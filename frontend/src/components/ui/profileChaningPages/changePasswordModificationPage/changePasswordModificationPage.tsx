import { FC } from "react";
import { Block, Wrapper } from "./styledChangePasswordModificationPage";
import { SettingsChangingHeader } from "../../../shared/settingsChangingHeader/settingsChangingHeader";
import { Content } from "./components/content/content";

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