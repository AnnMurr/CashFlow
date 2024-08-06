import { FC } from "react";
import { SettingsChangingHeader } from "../../../shared/settingsChangingHeader/settingsChangingHeader";
import { Body } from "../../../shared/body/body";
import { Content } from "./components/content/content";
import { Block, Wrapper } from "./styledChangePasswordPage";

export const ChangePasswordPage: FC = () => {
    return (
        <Body>
            <section>
                <Wrapper>
                    <SettingsChangingHeader category={"Password"} />
                    <Block>
                        <Content />
                    </Block>
                </Wrapper>
            </section>
        </Body>
    )
}