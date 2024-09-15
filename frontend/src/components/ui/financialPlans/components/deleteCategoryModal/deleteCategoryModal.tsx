import { FC, useContext } from "react";
import { BtnClose } from "../../../../shared/btnClose/btnClose";
import { ButtonComponent } from "../../../../shared/button/button";
import { BudgetPlanning, CategoryPlanning, RootState } from "../../../../../redux/reducers/userStorageReduser/types";
import { ThemeContextType } from "../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../contexts/themeContext/themeContext";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store/store";
import { changeUserData } from "../../../../../redux/reducers/userStorageReduser/userStorageReduser";
import { getDataFromLocalStorage } from "../../../../../storage/localStorage/localStorage";
import { showAlert } from "../../../../../utils/showAlert";
import { AlertComponentProps } from "../../../../shared/alert/alert";
import { BtnInner, Container, Title, Wrapper } from "./styledDeleteCategoryModal";

interface DeleteCategoryModalProps {
    closeModal: (value: boolean) => void;
    choosenEditCategory: CategoryPlanning | null;
    currentPlan: BudgetPlanning | null;
    setIsAlertActive: (value: AlertComponentProps | null) => void;
    setBudgetPlans: (value: Array<BudgetPlanning> | null) => void;
}

export const DeleteCategoryModal: FC<DeleteCategoryModalProps> = ({
    closeModal, choosenEditCategory, currentPlan, setIsAlertActive, setBudgetPlans }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    const { storageData } = useAppSelector((state: RootState) => state.storage);
    const dispatch = useAppDispatch();

    const updateStorageData = (currentPlan: BudgetPlanning | null, choosenEditCategory: CategoryPlanning | null) => {
        return storageData?.data?.planning.map(data =>
            data.period === currentPlan?.period
                ? {
                    period: currentPlan.period,
                    categories: data.categories.filter(item => item.name !== choosenEditCategory?.name)
                }
                : data
        );
    };

    const deleteCategory = async () => {
        const token = getDataFromLocalStorage("token");
        const updatedCategories = updateStorageData(currentPlan, choosenEditCategory);

        if (storageData && updatedCategories) {
            try {
                const updatedData = {
                    ...storageData,
                    data: {
                        ...storageData.data,
                        planning: updatedCategories
                    }
                };

                const userDataAfterUpdate = (await dispatch(changeUserData({ userToken: token, updatedData: updatedData }))).payload;

                if (userDataAfterUpdate) {
                    setBudgetPlans(updatedData.data.planning);
                    showAlert({ type: "success", text: "Category deleted successfully" }, setIsAlertActive, 3000);
                    closeModal(false);
                }
            } catch (error) {
                console.error(error);
            }
        }
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