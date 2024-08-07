import { FC, useContext } from "react";
import { BtnClose } from "../../../../../../shared/btnClose/btnClose";
import { ButtonComponent } from "../../../../../../shared/button/button";
import { useAppDispatch, useAppSelector } from "../../../../../../../redux/store/store";
import { getDataFromLocalStorage } from "../../../../../../../storage/localStorage/localStorage";
import { RootState, Transaction, UserStorageDataType } from "../../../../../../../redux/reducers/userStorageReduser/types";
import { changeUserData } from "../../../../../../../redux/reducers/userStorageReduser/userStorageReduser";
import { AlertComponentProps } from "../../../../../../shared/alert/alert";
import { getAlert } from "../../../../../../../utils/getAlert";
import { addScroll } from "../../../../../../../utils/toggleScroll";
import { getDataForStatistic } from "../../../../../../../utils/statisticalDataUtils";
import { ThemeContextType } from "../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../contexts/themeContext/themeContext";
import { BtnInner, Container, Title, Wrapper } from "./styledDeleteCategoryModal";

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
                    getAlert({ type: "success", text: "Data updated successfully" }, setIsAlertActive, 3000);
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
            <Wrapper>
                <BtnClose
                    btnInnerstyles={{
                        marginLeft: "auto",
                        paddingBottom: "15px",
                    }}
                    closeBlock={closeDeleteModal}
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