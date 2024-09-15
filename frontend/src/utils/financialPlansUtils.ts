import { AppDispatch } from "../redux/store/store";
import { AlertComponentProps } from "../components/shared/alert/alert";
import { BudgetPlanning, CategoryPlanning, UserStorageDataType } from "../redux/reducers/userStorageReduser/types";
import { changeUserData } from "../redux/reducers/userStorageReduser/userStorageReduser";
import { getDataFromLocalStorage } from "../storage/localStorage/localStorage";
import { showAlert } from "./showAlert";

interface DeleteCategoryParams {
    currentPlan: BudgetPlanning | null;
    choosenEditCategory: CategoryPlanning | null;
    storageData: UserStorageDataType | null;
    setCurrentPlan: (plan: BudgetPlanning | null) => void;
    dispatch: AppDispatch;
    setBudgetPlans: (plans: Array<BudgetPlanning> | null) => void;
    setIsAlertActive: (alert: AlertComponentProps | null) => void;
    closeModal: (isOpen: boolean) => void;
}

interface DeletePlanParams {
    storageData: UserStorageDataType | null;
    currentPlan: BudgetPlanning | null;
    setCurrentTab:(value: number) => void;
    dispatch: AppDispatch;
    setBudgetPlans: (plans: Array<BudgetPlanning> | null) => void;
    setIsAlertActive: (alert: AlertComponentProps | null) => void;
    closeModal: (isOpen: boolean) => void;
}

const removeCategoryFromPlan = (currentPlan: BudgetPlanning | null, choosenEditCategory: CategoryPlanning | null, storageData: UserStorageDataType | null) => {
    return storageData?.data?.planning.map(data =>
        data.period === currentPlan?.period
            ? {
                period: currentPlan.period,
                categories: data.categories.filter(item => item.name !== choosenEditCategory?.name)
            }
            : data
    );
};

export const deleteCategory = async (params: DeleteCategoryParams) => {
    const {
        storageData,
        currentPlan,
        choosenEditCategory,
        setCurrentPlan,
        dispatch,
        setBudgetPlans,
        setIsAlertActive,
        closeModal
    } = params;
    const token = getDataFromLocalStorage("token");
    const updatedCategories = removeCategoryFromPlan(currentPlan, choosenEditCategory, storageData);

    if (storageData && updatedCategories) {
        setCurrentPlan(null);

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

const removePlanFromStorage = (currentPlan: BudgetPlanning | null, storageData: UserStorageDataType | null) => {
    return storageData?.data?.planning.filter(data => data.period !== currentPlan?.period);
};

export const deletePlan = async (params: DeletePlanParams) => {
    const {
        storageData,
        currentPlan,
        setCurrentTab,
        dispatch,
        setBudgetPlans,
        setIsAlertActive,
        closeModal
    } = params;
    const token = getDataFromLocalStorage("token");
    const updatedCategories = removePlanFromStorage(currentPlan, storageData);

    if (storageData && updatedCategories) {
        setCurrentTab(0);

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
                showAlert({ type: "success", text: "Plan deleted successfully" }, setIsAlertActive, 3000);
                closeModal(false);
            }
        } catch (error) {
            console.error(error);
        }
    }
}