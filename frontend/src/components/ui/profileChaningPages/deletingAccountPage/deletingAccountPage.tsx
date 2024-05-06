import { FC } from "react";
import { SettingsChangingHeader } from "../../../shared/settingsChangingHeader/settingsChangingHeader";
import { Content } from "./components/content/content";
import { Block, Wrapper } from "./styledDeletingAccountPage";

export const DeletingAccountPage: FC = () => {
    return (
        <section>
            <Wrapper>
                <SettingsChangingHeader category={"Deliting account"} />
                <Block>
                    <Content />
                </Block>
            </Wrapper>
        </section>
    )
}