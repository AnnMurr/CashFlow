import { FC, useContext } from "react";
import { TableCell, TableRow } from "@mui/material";
import { ButtonComponent } from "../../../../../../shared/button/button";
import { useAppDispatch, useAppSelector } from "../../../../../../../redux/store/store";
import { CategoryPlanning, RootState } from "../../../../../../../redux/reducers/userStorageReduser/types";
import { changeUserData } from "../../../../../../../redux/reducers/userStorageReduser/userStorageReduser";
import { getDataFromLocalStorage } from "../../../../../../../storage/localStorage/localStorage";
import { showAlert } from "../../../../../../../utils/showAlert";
import { AlertComponentProps } from "../../../../../../shared/alert/alert";
import { ThemeContextType } from "../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../contexts/themeContext/themeContext";
import { BtnInner } from "./styledSaveBtn";

interface SaveBtnProps {
    completedCategories: Array<CategoryPlanning>;
    dateRange: string;
    setIsAlertActive: (value: AlertComponentProps | null) => void;
    setCompletedCategories: (value: Array<CategoryPlanning>) => void;
}

export const SaveBtn: FC<SaveBtnProps> = ({ setCompletedCategories, completedCategories, dateRange, setIsAlertActive }) => {
    const { storageData } = useAppSelector((state: RootState) => state.storage);
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    const dispatch = useAppDispatch();

    const saveTemplate = async () => {
        const token = getDataFromLocalStorage("token");
        const isPeriodExist = storageData?.data.planning.find(data => data.period === dateRange);

        if (isPeriodExist) {
            showAlert({ type: "warning", text: "This period already exists" }, setIsAlertActive, 3000);
            return;
        }

        if (storageData && completedCategories.length) {
            try {
                const updatedData = {
                    ...storageData,
                    data: {
                        ...storageData.data,
                        planning: [
                            ...storageData.data.planning,
                            {
                                period: dateRange,
                                categories: completedCategories
                            }]
                    }
                };

                const userDataAfterUpdate = (await dispatch(changeUserData({ userToken: token, updatedData: updatedData }))).payload;

                if (userDataAfterUpdate) {
                    showAlert({ type: "success", text: "Budget plan added successfully" }, setIsAlertActive, 3000);
                    setCompletedCategories([]);
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            showAlert({ type: "error", text: "There are no saved items" }, setIsAlertActive, 3000);
        }
    }

    const tableCellStyles = {
        borderBottom: `1px solid ${themeContext.themeStyles.budgetPlannerRowBorder}`
    };

    return (
        <TableRow>
            <TableCell sx={tableCellStyles} colSpan={4} align="right">
                <BtnInner>
                    <ButtonComponent
                        disabledValue={false}
                        text="Save"
                        color="#fff"
                        type="button"
                        func={saveTemplate}
                    />
                </BtnInner>
            </TableCell>
        </TableRow>
    )
}