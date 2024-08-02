import { FC } from "react";
import { Wrapper, Block } from "./styledDeletingAccountСonfirmationPage";
import { SettingsChangingHeader } from "../../../shared/settingsChangingHeader/settingsChangingHeader";
import { Body } from "../../../shared/body/body";
import { Content } from "./components/content/content";

export const DeletingAccountConfirmationPage: FC = () => {
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