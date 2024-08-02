import { FC } from "react";
import { SettingsChangingHeader } from "../../../shared/settingsChangingHeader/settingsChangingHeader";
import { Body } from "../../../shared/body/body";
import { Content } from "./components/content/content";
import { Block, Wrapper } from "./styledDeletingAccountPage";

export const DeletingAccountPage: FC = () => {
    return (
        <Body>
            <section>
                <Wrapper>
                    <SettingsChangingHeader category={"Deliting account"} />
                    <Block>
                        <Content />
                    </Block>
                </Wrapper>
            </section>
        </Body>
    )
}