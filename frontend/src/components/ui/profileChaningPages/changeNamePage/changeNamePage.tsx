import { FC } from "react";
import { Content } from "./components/content/content";
import { SettingsChangingHeader } from "../../../shared/settingsChangingHeader/settingsChangingHeader";
import { Wrapper, Block } from "./styledChangeNamePage";

export const ChangeNamePage: FC = () => {
    return (
        <section>
            <Wrapper>
                <SettingsChangingHeader category={"Name"} />
                <Block>
                    <Content />
                </Block>
            </Wrapper>
        </section>
    )
}