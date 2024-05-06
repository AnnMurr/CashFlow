import { FC } from "react";
import { Content } from "./components/content/content";
import { SettingsChangingHeader } from "../../../shared/settingsChangingHeader/settingsChangingHeader";
import { Wrapper, Block } from "./styledChangeEmailPage";

export const ChangeEmailPage: FC = () => {
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