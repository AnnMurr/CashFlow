import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonComponent } from "../../../../../../../shared/button/button";
import { showAlert } from "../../../../../../../../utils/showAlert";
import { UserDataType } from "../../../../../../../../redux/reducers/userReducer/types";
import { useAppDispatch, useAppSelector } from "../../../../../../../../redux/store/store";
import { PASSWORD_PATTERN } from "../../../../../../../../consts";
import { updateUserData } from "../../../../../../../../redux/reducers/userReducer/userReducer";
import { unwrapResult } from "@reduxjs/toolkit";
import { PasswordType } from "../../content";
import { AlertComponentProps } from "../../../../../../../shared/alert/alert";
import { Inner } from "./styledSubmitButton";

interface SubmitButtonProps {
    passwordValue: PasswordType;
    setIsError: (value: boolean) => void;
    setIsAlertActive: (value: null | AlertComponentProps) => void;
}

export const SubmitButton: FC<SubmitButtonProps> = ({
    passwordValue, setIsError, setIsAlertActive }) => {
    const userDataFromRedux: UserDataType | null = useAppSelector((state) => state.user.userData);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const changePassword = async () => {
        const { password, confirmPassword } = passwordValue;

        if (password.length > 0 &&
            confirmPassword.length > 0 && !!password.match(PASSWORD_PATTERN)) {
            if (password === confirmPassword) {
                try {
                    if (userDataFromRedux) {
                        const changedData = {
                            ...userDataFromRedux,
                            password: password
                        };

                        const resultAction = await dispatch(updateUserData(changedData));
                        const response = unwrapResult(resultAction);

                        if (response) {
                            showAlert({ type: "success", text: response }, setIsAlertActive, 3000);
                            setIsError(false);
                            setTimeout(() => navigate("/settings"), 1000);
                        }
                    }
                } catch (error) {
                    console.error(error);
                }
            } else {
                showAlert({ type: "error", text: "Passwords must match." }, setIsAlertActive, 3000);
                setIsError(true);
            }
        } else {
            showAlert({ type: "error", text: "Password must contain at least one digit, one special character '!@#$%^&*', one lowercase letter, one uppercase letter, and should not contain any spaces." }, setIsAlertActive, 3000);
            setIsError(true);
        }
    }

    return (
        <Inner>
            <ButtonComponent
                text="Save"
                color="#fff"
                type="submit"
                func={changePassword} />
        </Inner>
    )
}