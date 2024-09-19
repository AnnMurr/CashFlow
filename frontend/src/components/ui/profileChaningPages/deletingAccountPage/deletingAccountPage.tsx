import { FC } from "react";
import { Body, Content, SettingsChangingHeader } from ".";
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