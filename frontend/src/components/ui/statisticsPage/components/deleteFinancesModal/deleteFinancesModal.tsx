import { FC, useContext } from "react";
import { BtnClose } from "../../../../shared/btnClose/btnClose";
import { ButtonComponent } from "../../../../shared/button/button";
import { useAppDispatch } from "../../../../../redux/store/store";
import { getDataFromLocalStorage } from "../../../../../storage/localStorage/localStorage";
import { UserStorageDataType } from "../../../../../redux/reducers/userStorageReduser/types";
import { changeUserData, getDataFromUserStore } from "../../../../../redux/reducers/userStorageReduser/userStorageReduser";
import { AlertComponentProps } from "../../../../shared/alert/alert";
import { showAlert } from "../../../../../utils/showAlert";
import { getDataForStatistic } from "../../../../../utils/statisticalDataUtils";
import { ThemeContextType } from "../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../contexts/themeContext/themeContext";
import { BtnInner, Container, Title, Wrapper } from "./styledDeleteFinancesModal";

interface DeleteFinancesModalProps {
    setIsDeleteFinancesModal: (value: boolean) => void;
    setIsAlertActive: (value: AlertComponentProps | null) => void;
    statisticType: "expenses" | "income";
}

export const DeleteFinancesModal: FC<DeleteFinancesModalProps> = ({ setIsDeleteFinancesModal, setIsAlertActive, statisticType }) => {
    const dispatch = useAppDispatch();
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    const deleteFinances = async () => {
        try {
            const token = getDataFromLocalStorage("token");
            const userDataFromStorage: UserStorageDataType = (await dispatch(getDataFromUserStore(token))).payload as UserStorageDataType;

            const updatedData = {
                ...userDataFromStorage,
                data: {
                    ...userDataFromStorage.data,
                    expenses: [],
                    income: []
                }
            }

            const userDataAfterUpdate = (await dispatch(changeUserData({ userToken: token, updatedData: updatedData }))).payload;

            if (userDataAfterUpdate) {
                showAlert({ type: "success", text: "Category deleted successfully" }, setIsAlertActive, 3000);
                setIsDeleteFinancesModal(false);
                getDataForStatistic(statisticType, dispatch);
            }
        } catch (error) {
            showAlert({ type: "warning", text: "Please try again later." }, setIsAlertActive, 3000);
            console.error(error);
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
                    closeBlock={setIsDeleteFinancesModal}
                    size="lg" />
                <Title themestyles={themeContext.themeStyles}>
                    <h5>
                        Are you sure you want to delete all financial statistics? This action
                        is irreversible, and all income and expense data will be permanently removed
                    </h5>
                </Title>
                <BtnInner>
                    <ButtonComponent
                        backgroundColor="#a71616"
                        BackgroundColorHover="#820e0e"
                        text="Delete finances"
                        color="#fff"
                        type="button"
                        func={deleteFinances} />
                </BtnInner>
            </Wrapper>
        </Container>
    )
}