import { FC } from "react";
import { v4 as uuidV4 } from "uuid";
import { ICONS_COLLECTION } from "../../../../../consts/images";
import { ButtonComponent } from ".././../../../shared/button/button";
import { BtnInner, Container, Input, InputInner, Item, Label, List, Wrapper } from "./styledCategorySelectionModal";

export const CategorySelectionModal: FC = () => {
    return (
        <Container>
            <Wrapper>
                <InputInner>
                    <Label>Category name</Label>
                    <Input type="text" />
                </InputInner>
                <List>
                    {ICONS_COLLECTION.slice(0, 9).map((icon) => (
                        <Item key={uuidV4()}>
                            <img src={icon.default} alt="" />
                        </Item>
                    ))}
                </List>
                <BtnInner>
                    <ButtonComponent
                        backgroundColor="#5B8A72"
                        BackgroundColorHover="#0f4a34"
                        text="Add"
                        color="#fff"
                        type="button" />
                </BtnInner>
            </Wrapper>
        </Container>
    )
}