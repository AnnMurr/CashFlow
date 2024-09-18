import { FC, useContext } from "react";
import { BudgetPlanning, RootState } from "../../../../../redux/reducers/userStorageReduser/types";
import { ThemeContextType } from "../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../contexts/themeContext/themeContext";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store/store";
import { AlertComponentProps } from "../../../../shared/alert/alert";
import { deletePlan } from "../../../../../utils/financialPlansUtils";
import { ConfirmationModal } from "../../../../shared/confirmationModal/confirmationModal";
import { Container } from "./styledDeletePlanModal";

interface DeleteCategoryModalProps {
    closeModal: (value: boolean) => void;
    currentPlan: BudgetPlanning | null;
    setIsAlertActive: (value: AlertComponentProps | null) => void;
    setBudgetPlans: (value: Array<BudgetPlanning> | null) => void;
    setCurrentTab: (value: number) => void;
}

export const DeletePlanModal: FC<DeleteCategoryModalProps> = ({
    closeModal, currentPlan, setIsAlertActive, setBudgetPlans, setCurrentTab }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    const { storageData } = useAppSelector((state: RootState) => state.storage);
    const dispatch = useAppDispatch();

    const handleDeletePlan = async () => {
        await deletePlan({
            storageData,
            currentPlan,
            setCurrentTab,
            dispatch,
            setBudgetPlans,
            setIsAlertActive,
            closeModal
        });
    }

    return (
        <Container themestyles={themeContext.themeStyles}>
            <ConfirmationModal
                closeModal={closeModal}
                handleClick={handleDeletePlan}
                text="Are you sure you want to delete this plan?"
                btnText="Delete" />
        </Container>
    )
}