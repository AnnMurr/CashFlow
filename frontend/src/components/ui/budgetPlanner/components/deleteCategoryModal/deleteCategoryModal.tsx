import { FC, useContext } from "react";
import { BtnClose } from "../../../../shared/btnClose/btnClose";
import { ButtonComponent } from "../../../../shared/button/button";
import { CategoryPlanning } from "../../../../../redux/reducers/userStorageReduser/types";
import { ThemeContextType } from "../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../contexts/themeContext/themeContext";
import { BtnInner, Container, Title, Wrapper } from "./styledDeleteCategoryModal";

interface DeleteCategoryModalProps {
    closeModal: (value: boolean) => void;
    choosenEditCategory: CategoryPlanning | null;
    completedCategories: Array<CategoryPlanning>;
    setCompletedCategories: (value: Array<CategoryPlanning>) => void;
}

export const DeleteCategoryModal: FC<DeleteCategoryModalProps> = ({ 
    closeModal, choosenEditCategory, completedCategories, setCompletedCategories }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    const deleteCategory = () => {
        const updatedCategories = completedCategories.filter(item => item.name !== choosenEditCategory?.name);
        setCompletedCategories(updatedCategories);
        closeModal(false);
    }

    return (
        <Container themestyles={themeContext.themeStyles}>
            <Wrapper>
                <BtnClose
                    btnInnerstyles={{
                        marginLeft: "auto",
                        paddingBottom: "15px",
                    }}
                    closeBlock={closeModal}
                    size="lg" />
                <Title themestyles={themeContext.themeStyles}>
                    <h5>
                        Are you sure you want to delete this category?
                    </h5>
                </Title>
                <BtnInner>
                    <ButtonComponent
                        backgroundColor="#a71616"
                        BackgroundColorHover="#820e0e"
                        text="Delete"
                        color="#fff"
                        type="button"
                        func={deleteCategory} />
                </BtnInner>
            </Wrapper>
        </Container>
    )
}