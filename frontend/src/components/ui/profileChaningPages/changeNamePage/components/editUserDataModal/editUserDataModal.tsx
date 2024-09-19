import { FC, useContext, useState } from "react";
import { updateUserData } from "../../../../../../redux/reducers/userReducer/userReducer";
import { UserDataType } from "../../../../../../redux/reducers/userReducer/types";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/store/store";
import { showAlert } from "../../../../../../utils/showAlert";
import { unwrapResult } from "@reduxjs/toolkit";
import { ThemeContextType } from "../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../contexts/themeContext/themeContext";
import { AlertComponentProps } from "../../../../../shared/alert/alert";
import { BtnClose, ButtonComponent, OutlinedInputComponent } from ".";
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
                        showAlert({ text: response, type: "success" }, setIsAlertActive, 3000);
                    }
                }
            } catch (error) {
                showAlert({ text: "failed to update", type: "error" }, setIsAlertActive, 3000);
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
                    <OutlinedInputComponent
                        isError={error}
                        value={value}
                        placeholderValue={"Name"}
                        type={"text"}
                        maxLengthNumber={30}
                        handleChange={(event) => setValue((event.target.value.trimStart()))} />
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