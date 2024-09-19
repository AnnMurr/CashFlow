import { AppDispatch } from "../redux/store/store";
import { AlertComponentProps } from "../components/shared/alert/alert";
import { BudgetPlanning, CategoryPlanning, UserStorageDataType } from "../redux/reducers/userStorageReduser/types";
import { changeUserData } from "../redux/reducers/userStorageReduser/userStorageReduser";
import { getDataFromLocalStorage } from "../storage/localStorage/localStorage";
import { showAlert } from "./showAlert";

interface DeletePlanParams {
    storageData: UserStorageDataType | null;
    currentPlan: BudgetPlanning | null;
    setCurrentTab: (value: number) => void;
    dispatch: AppDispatch;
    setBudgetPlans: (plans: Array<BudgetPlanning> | null) => void;
    setIsAlertActive: (alert: AlertComponentProps | null) => void;
    closeModal: (isOpen: boolean) => void;
}

interface DeleteCategoryParams extends DeletePlanParams {
    choosenEditCategory: CategoryPlanning | null;
}

interface UpdateCategoryInPlanProps {
    storageData: UserStorageDataType | null;
    currentPlan: BudgetPlanning | null;
    choosenEditCategory: CategoryPlanning | null;
    categoryName: string;
    sum: string;
}

interface EditCategoryProps extends UpdateCategoryInPlanProps {
    dispatch: AppDispatch;
    setIsAlertActive: (alert: AlertComponentProps | null) => void;
    setIsEditModalActive: (isOpen: boolean) => void;
    setBudgetPlans: (plans: Array<BudgetPlanning> | null) => void;
}

type RemoveCategoryFromPlanType = (
    currentPlan: BudgetPlanning | null,
    choosenEditCategory: CategoryPlanning | null,
    storageData: UserStorageDataType | null) => BudgetPlanning[] | undefined;

type RemovePlanFromStorageType = (
    currentPlan: BudgetPlanning | null,
    storageData: UserStorageDataType | null) => BudgetPlanning[] | undefined;

const removeCategoryFromPlan: RemoveCategoryFromPlanType = (
    currentPlan,
    choosenEditCategory,
    storageData) => {
    return storageData?.data?.planning.map(data =>
        data.period === currentPlan?.period
            ? {
                period: currentPlan.period,
                categories: data.categories.filter(item => item.name !== choosenEditCategory?.name)
            }
            : data
    );
};

const updateCategoryInPlan = (props: UpdateCategoryInPlanProps) => {
    const { storageData, currentPlan, choosenEditCategory, categoryName, sum } = props;

    return storageData?.data?.planning?.map(data => ({
        ...data,
        categories: data.period === currentPlan?.period
            ? data.categories.map(item =>
                item.name === choosenEditCategory?.name
                    ? { name: categoryName, sum: +sum }
                    : item
            )
            : data.categories
    })) || [];
}

const removePlanFromStorage: RemovePlanFromStorageType = (currentPlan, storageData) => {
    return storageData?.data?.planning.filter(data => data.period !== currentPlan?.period);
}

export const deletePlan = async (params: DeletePlanParams): Promise<void> => {
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

export const deleteCategory = async (params: DeleteCategoryParams): Promise<void> => {
    const {
        storageData,
        currentPlan,
        choosenEditCategory,
        dispatch,
        setBudgetPlans,
        setIsAlertActive,
        closeModal,
        setCurrentTab
    } = params;
    const token = getDataFromLocalStorage("token");
    const updatedCategories = removeCategoryFromPlan(currentPlan, choosenEditCategory, storageData);
    const currentPlanCategoriesLength = updatedCategories?.find(item => item.period === currentPlan?.period)?.categories.length;

    if (currentPlanCategoriesLength) {
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
    } else {
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
}

export const editCategory = async (params: EditCategoryProps): Promise<void> => {
    const {
        storageData,
        currentPlan,
        choosenEditCategory,
        categoryName,
        sum,
        dispatch,
        setIsAlertActive,
        setIsEditModalActive,
        setBudgetPlans
    } = params;
    try {
        if (storageData) {
            const token = getDataFromLocalStorage("token");
            const updatedCategories = updateCategoryInPlan({ storageData, currentPlan, choosenEditCategory, categoryName, sum });

            const updatedData = {
                ...storageData,
                data: {
                    ...storageData.data,
                    planning: updatedCategories
                }
            }

            const userDataAfterUpdate = (await dispatch(changeUserData({ userToken: token, updatedData: updatedData }))).payload;

            if (userDataAfterUpdate) {
                setBudgetPlans(updatedData.data.planning);
                showAlert({ type: "success", text: "Category updated successfully" }, setIsAlertActive, 3000);
                setIsEditModalActive(false);
            }
        }
    } catch (error) {
        console.error(error);
    }
}