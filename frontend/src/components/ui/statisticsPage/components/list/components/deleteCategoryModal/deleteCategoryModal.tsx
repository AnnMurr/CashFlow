import { FC, useContext } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../../redux/store/store";
import { getDataFromLocalStorage } from "../../../../../../../storage/localStorage/localStorage";
import { RootState, Transaction, UserStorageDataType } from "../../../../../../../redux/reducers/userStorageReduser/types";
import { changeUserData } from "../../../../../../../redux/reducers/userStorageReduser/userStorageReduser";
import { AlertComponentProps } from "../../../../../../shared/alert/alert";
import { showAlert } from "../../../../../../../utils/showAlert";
import { addScroll } from "../../../../../../../utils/toggleScroll";
import { getDataForStatistic } from "../../../../../../../utils/statisticalDataUtils";
import { ThemeContextType } from "../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../contexts/themeContext/themeContext";
import { ConfirmationModal } from "../../../../../../shared/confirmationModal/confirmationModal";
import { Container } from "./styledDeleteCategoryModal";

interface DeleteCategoryModalProps {
    closeDeleteModal: (value: boolean) => void;
    choosedCategoryId: string | null;
    setIsAlertActive: (value: AlertComponentProps | null) => void;
    statisticType: "expenses" | "income";
}

type RemoveCategoryById = (categories: Array<Transaction>, categoryId: string | null) => Array<Transaction>

export const DeleteCategoryModal: FC<DeleteCategoryModalProps> = ({
    closeDeleteModal, choosedCategoryId, setIsAlertActive, statisticType }) => {
    const dispatch = useAppDispatch();
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    const { storageData } = useAppSelector((state: RootState) => state.storage);

    const removeCategoryById: RemoveCategoryById = (categories, categoryId) => {
        return categories.filter(category => category.uid !== categoryId);
    }

    const deleteCategory = async () => {
        try {
            const token = getDataFromLocalStorage("token");
            const storageDataCopy: UserStorageDataType = JSON.parse(JSON.stringify(storageData))

            if (storageDataCopy) {
                storageDataCopy.data.expenses = removeCategoryById(storageDataCopy.data.expenses, choosedCategoryId);
                storageDataCopy.data.income = removeCategoryById(storageDataCopy.data.income, choosedCategoryId);

                const changeUserDataResponse = (await dispatch(changeUserData({ userToken: token, updatedData: storageDataCopy }))).payload

                if (changeUserDataResponse) {
                    showAlert({ type: "success", text: "Data updated successfully" }, setIsAlertActive, 3000);
                    closeDeleteModal(false);
                    getDataForStatistic(statisticType, dispatch);
                    addScroll();
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Container themestyles={themeContext.themeStyles}>
            <ConfirmationModal
                closeModal={closeDeleteModal}
                handleClick={deleteCategory}
                text="Are you sure you want to delete this category?"
                btnText="Delete" />
        </Container>
    )
}