import { FC, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { ICONS_COLLECTION } from "../../../../../consts/images";
import { ButtonComponent } from ".././../../../shared/button/button";
import { BtnInner, Container, Input, InputInner, Item, Label, List, Wrapper } from "./styledCategorySelectionModal";

export const CategorySelectionModal: FC = () => {
    const [selectedIcon, setSelectedIcon] = useState<string>();

    const selectCategoryIcon = (event: React.MouseEvent<HTMLButtonElement>) => {
        const button = event.currentTarget as HTMLButtonElement;
        const image = button.children[0] as HTMLImageElement;
        const parrent =  button.parentNode as HTMLDivElement;
        image && setSelectedIcon(image.src);
        parrent && (parrent.style.border = "1px solid #cacaca");

        console.log(selectedIcon)
    }
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
                            <button onClick={selectCategoryIcon} type="button">
                                <img src={icon.default} alt="" />
                            </button>
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