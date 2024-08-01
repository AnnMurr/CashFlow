import { FC, useContext, useState } from "react";
import { updateUserData } from "../../../../../../../../redux/reducers/userReducer/userReducer";
import { UserDataType } from "../../../../../../../../redux/reducers/userReducer/types";
import { useAppDispatch, useAppSelector } from "../../../../../../../../redux/store/store";
import { getAlert } from "../../../../../../../../utils/getAlert";
import { unwrapResult } from "@reduxjs/toolkit";
import { OutlinedInput } from "@mui/material";
import { AlertComponentProps } from "../../../../../../../shared/alert/alert";
import { ButtonComponent } from "../../../../../../../shared/button/button";
import { BtnClose } from "../../../../../../../shared/btnClose/btnClose";
import { ThemeContextType } from "../../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../../contexts/themeContext/themeContext";
import { BtnInner, Container, Wrapper } from "./styledEditUserDataModal";

interface EditUserDataModalProps {
    setIsModalActive: (value: boolean) => void;
    userData: string | undefined | null;
    changeUserData: (value: string) => void;
    setIsAlertActive: (value: null | AlertComponentProps) => void;
}

export const EditUserDataModal: FC<EditUserDataModalProps> = ({
    setIsModalActive,
    userData,
    changeUserData,
    setIsAlertActive }) => {

    const [value, setValue] = useState<string | undefined | null>(userData);
    const [error, setError] = useState<boolean>(false);
    const userDataFromRedux: UserDataType | null = useAppSelector((state) => state.user.userData);
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    const dispatch = useAppDispatch();

    const changeData = async () => {
        value && value.length < 2 && setIsAlertActive({ type: "error", text: "Minimum length is 2 characters" });
        value && value.length > 20 && setIsAlertActive({ type: "error", text: "Maximum length is 20 characters" });

        if (value && value.length >= 2 && value.length <= 20) {
            try {
                if (userDataFromRedux) {
                    const changedData = {
                        ...userDataFromRedux,
                        name: value
                    }

                    const resultAction = await dispatch(updateUserData(changedData));
                    const response = unwrapResult(resultAction);

                    if (response) {
                        changeUserData(value);
                        setIsModalActive(false);
                        getAlert({ text: response, type: "success" }, setIsAlertActive, 3000);
                    }
                }
            } catch (error) {
                getAlert({ text: "failed to update", type: "error" }, setIsAlertActive, 3000);
                console.error(error);
            }
        } else {
            setError(true);
        }
    }

    return (
        <Container themestyles={themeContext.themeStyles}>
            <Wrapper>
                <BtnClose
                    btnInnerstyles={{
                        marginLeft: "auto",
                        paddingBottom: "15px"
                    }}
                    closeBlock={setIsModalActive}
                    size="lg" />
                <div>
                    <OutlinedInput
                        sx={{
                            marginBottom: "20px",
                            width: "100%",
                            fontSize: "14px",
                            color: themeContext.themeStyles.color,

                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: themeContext.themeStyles.inputBorder,
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: themeContext.themeStyles.inputBorderHover,
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: themeContext.themeStyles.inputBorderFocused,
                            }
                        }}
                        error={error}
                        maxRows={1}
                        value={value}
                        onChange={(event) => setValue((event.target.value.trimStart()))}
                        size="small"
                        placeholder="Name" />
                </div>
                <BtnInner>
                    <ButtonComponent
                        disabledValue={userData === value ? true : false}
                        text="Save"
                        color="#fff"
                        type="button"
                        func={changeData} />
                </BtnInner>
            </Wrapper>
        </Container>
    )
}