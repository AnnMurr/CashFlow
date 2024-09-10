import { FC } from "react";
import { TableCell, TableRow } from "@mui/material";
import { ButtonComponent } from "../../../../../../shared/button/button";
import { useAppDispatch, useAppSelector } from "../../../../../../../redux/store/store";
import { RootState } from "../../../../../../../redux/reducers/userStorageReduser/types";
import { changeUserData } from "../../../../../../../redux/reducers/userStorageReduser/userStorageReduser";
import { getDataFromLocalStorage } from "../../../../../../../storage/localStorage/localStorage";
import { showAlert } from "../../../../../../../utils/showAlert";
import { AlertComponentProps } from "../../../../../../shared/alert/alert";
import { BtnInner } from "./styledSaveBtn";

interface SaveBtnProps {
    completedCategories: Array<{ name: string; sum: string }>;
    dateRange: string;
    setIsAlertActive: (value: AlertComponentProps | null) => void;
}

export const SaveBtn: FC<SaveBtnProps> = ({ completedCategories, dateRange, setIsAlertActive }) => {
    const { storageData } = useAppSelector((state: RootState) => state.storage);
    const dispatch = useAppDispatch();

    const saveTemplate = async () => {
        const token = getDataFromLocalStorage("token");

        if (storageData) {
            try {
                const updatedData = {
                    ...storageData,
                    data: {
                        ...storageData.data,
                        planing: [...storageData.data.planning, {
                            period: dateRange,
                            categories: completedCategories
                        }]
                    }
                }

                const userDataAfterUpdate = (await dispatch(changeUserData({ userToken: token, updatedData: updatedData }))).payload;

                if (userDataAfterUpdate) {
                    showAlert({ type: "success", text: "Transaction added successfully" }, setIsAlertActive, 3000);
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <TableRow>
            <TableCell colSpan={4} align="right">
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