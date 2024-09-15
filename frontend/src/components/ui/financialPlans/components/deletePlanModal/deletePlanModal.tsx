import { FC, useContext } from "react";
import { BtnClose } from "../../../../shared/btnClose/btnClose";
import { ButtonComponent } from "../../../../shared/button/button";
import { BudgetPlanning, CategoryPlanning, RootState } from "../../../../../redux/reducers/userStorageReduser/types";
import { ThemeContextType } from "../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../contexts/themeContext/themeContext";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store/store";
import { AlertComponentProps } from "../../../../shared/alert/alert";
import { deletePlan } from "../../../../../utils/financialPlansUtils";
import { BtnInner, Container, Title, Wrapper } from "./styledDeletePlanModal";

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

    const handleDeletePlan = () => {
        deletePlan({
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
                        Are you sure you want to delete this plan?
                    </h5>
                </Title>
                <BtnInner>
                    <ButtonComponent
                        backgroundColor="#a71616"
                        BackgroundColorHover="#820e0e"
                        text="Delete"
                        color="#fff"
                        type="button"
                        func={handleDeletePlan} />
                </BtnInner>
            </Wrapper>
        </Container>
    )
}