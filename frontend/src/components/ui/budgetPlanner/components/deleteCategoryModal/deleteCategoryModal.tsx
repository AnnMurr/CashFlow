import { FC, useContext } from "react";
import { CategoryPlanning } from "../../../../../redux/reducers/userStorageReduser/types";
import { ThemeContextType } from "../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../contexts/themeContext/themeContext";
import { ConfirmationModal } from "../../../../../components/shared/confirmationModal/confirmationModal";
import { Container } from "./styledDeleteCategoryModal";

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
            <ConfirmationModal
                closeModal={closeModal}
                handleClick={deleteCategory}
                text="Are you sure you want to delete this category?"
                btnText="Delete" />
        </Container>
    )
}