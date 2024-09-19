import { FC } from "react";
import { Body, Content, SettingsChangingHeader } from ".";
import { Wrapper, Block } from "./styledDeletingAccountСonfirmationPage";

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