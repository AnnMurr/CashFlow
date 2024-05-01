import { FC } from "react";
import { Item } from "./components/item/item";
import { Wrapper, Container, Block } from "./styledChangeEmailPage";

export const ChangeEmailPage: FC = () => {
    return (
        <Container>
            <Wrapper>
                <Block>
                    <Item />
                </Block>
            </Wrapper>
        </Container>
    )
}