import { ICONS_COLLECTION } from "../../../../../consts/images";
import { FC, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { CategorySelectionModal } from "../categorySelectionModal/categorySelectionModal";
import { DarkBackground } from "../../../../shared/darkBackground/darkBackground";
import { Container, List, Item, AddCategoryBtn, AddCategoryBtnInner } from "./styledBody";

export const Body: FC = () => {
    const [isCategorySelectionModalActive, setIsCategorySelectionModalActive] = useState<boolean>(false);

    const toggleCategorySelectionModal = () => {
        setIsCategorySelectionModalActive(true);
    }

    return (
        <Container>
            <List>
                {ICONS_COLLECTION.slice(0, 9).map((icon) => (
                    <Item key={uuidV4()}>
                        <img src={icon.default} alt="" />
                    </Item>
                ))}
            </List>
            <AddCategoryBtnInner>
                <AddCategoryBtn onClick={toggleCategorySelectionModal} type="button"></AddCategoryBtn>
            </AddCategoryBtnInner>
            {isCategorySelectionModalActive ?
                <>
                    <CategorySelectionModal />
                    <DarkBackground />
                </>
                : null}
        </Container>
    )
}