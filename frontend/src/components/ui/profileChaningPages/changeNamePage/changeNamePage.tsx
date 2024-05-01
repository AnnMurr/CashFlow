import { FC } from "react";
import { Item } from "./components/item/item";
import { SettingsChangingHeader } from "../../../shared/settingsChangingHeader/settingsChangingHeader";
import { Wrapper, Container, Block } from "./styledChangeNamePage";

export const ChangeNamePage: FC = () => {
    return (
        <Container>
            <Wrapper>
                <SettingsChangingHeader category={"Name"} />
                <Block>
                    <Item />
                </Block>
            </Wrapper>
        </Container>
    )
}