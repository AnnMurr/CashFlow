import { FC, useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { CategorySelectionModal } from "../categorySelectionModal/categorySelectionModal";
import { DarkBackground } from "../../../../shared/darkBackground/darkBackground";
import { AlertComponent, AlertComponentProps } from "../../../../shared/alert/alert";
import { getDataFromLocalStorage } from "../../../../../storage/localStorage/localStorage";
import { getDataFromUserStore } from "../../../../../api/userDataApi/userDataApi";
import { CategoriesExpensesType } from "../../../../../api/userDataApi/styledUserDataApi";
import { Container, List, Item, AddCategoryBtn, AddCategoryBtnInner, CategoryName, IconInner } from "./styledBody";

export const Body: FC = () => {
    const [isCategorySelectionModalActive, setIsCategorySelectionModalActive] = useState<boolean>(false);
    const [categories, setCategories] = useState<Array<CategoriesExpensesType> | null>(null);
    const [isAlertActive, setIsAlertActive] = useState<AlertComponentProps | null>(null);

    const toggleCategorySelectionModal = () => {
        setIsCategorySelectionModalActive(true);
    }

    const getUserDataFromStorage = async () => {
        const token = getDataFromLocalStorage("token");

        try {
            const userDataFromStorage = await getDataFromUserStore(token);
            setCategories(userDataFromStorage.data.categoriesExpenses);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserDataFromStorage();
    }, []);

    return (
        <Container>
            <List>
                {categories && categories.map((category: any) => (
                    <Item key={uuidV4()}>
                        <IconInner>
                            <img src={category.icon} alt={category.name} />
                        </IconInner>
                        <CategoryName>
                            <span>{category.name}</span>
                        </CategoryName>
                    </Item>
                ))}
            </List>
            <AddCategoryBtnInner>
                <AddCategoryBtn onClick={toggleCategorySelectionModal} type="button"></AddCategoryBtn>
            </AddCategoryBtnInner>
            {isCategorySelectionModalActive ?
                <>
                    <CategorySelectionModal
                        getUserDataFromStorage={getUserDataFromStorage}
                        setIsAlertActive={setIsAlertActive}
                        togleModal={setIsCategorySelectionModalActive} />
                    <DarkBackground />
                </>
                : null}
            {isAlertActive ?
                <AlertComponent type={isAlertActive.type} text={isAlertActive.text} />
                : null}
        </Container>
    )
}