import { FC, useContext } from "react";
import { BudgetPlanning, CategoryPlanning, RootState } from "../../../../../redux/reducers/userStorageReduser/types";
import { ThemeContextType } from "../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../contexts/themeContext/themeContext";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store/store";
import { AlertComponentProps } from "../../../../shared/alert/alert";
import { deleteCategory } from "../../../../../utils/financialPlansUtils";
import { ConfirmationModal } from "../../../../shared/confirmationModal/confirmationModal";
import { Container } from "./styledDeleteCategoryModal";

interface DeleteCategoryModalProps {
    closeModal: (value: boolean) => void;
    choosenEditCategory: CategoryPlanning | null;
    currentPlan: BudgetPlanning | null;
    setIsAlertActive: (value: AlertComponentProps | null) => void;
    setBudgetPlans: (value: Array<BudgetPlanning> | null) => void;
    setCurrentTab: (value: number) => void;
}

export const DeleteCategoryModal: FC<DeleteCategoryModalProps> = ({
    closeModal, choosenEditCategory, currentPlan, setIsAlertActive, setBudgetPlans, setCurrentTab }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    const { storageData } = useAppSelector((state: RootState) => state.storage);
    const dispatch = useAppDispatch();

    const handleDeleteCategory = async () => {
        await deleteCategory({
            storageData,
            currentPlan,
            choosenEditCategory,
            dispatch,
            setBudgetPlans,
            setIsAlertActive,
            closeModal,
            setCurrentTab
        });
    }

    return (
        <Container themestyles={themeContext.themeStyles}>
            <ConfirmationModal
                closeModal={closeModal}
                handleClick={handleDeleteCategory}
                text="Are you sure you want to delete this category?"
                btnText="Delete" />
        </Container>
    )
}