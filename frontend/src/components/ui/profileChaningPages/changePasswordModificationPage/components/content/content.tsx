import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OutlinedInput } from "@mui/material";
import { AlertComponent, AlertComponentProps } from "../../../../../shared/alert/alert";
import { ButtonComponent } from "../../../../../shared/button/button";
import { BtnShowPassword } from "../../../../../shared/btnShowPassword/btnShowPassword";
import { PASSWORD_PATTERN } from "../../../../../../consts/index";
import { updateUserData } from "../../../../../../redux/reducers/userReducer/userReducer";
import { UserDataType } from "../../../../../../redux/reducers/userReducer/types";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/store/store";
import { unwrapResult } from "@reduxjs/toolkit";
import { BtnInner, BtnShowPasswordInner, Label, SubTitle, Title } from "./styledContent";

export const Content: FC = () => {
    const [passwordValue, setPasswordValue] = useState<string>("");
    const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>("");
    const [isAlertActive, setIsAlertActive] = useState<null | AlertComponentProps>(null);
    const [isInputTypePassword, setIsInputTypePassword] = useState<boolean>(true);
    const [isInputConfirmTypePassword, setIsInputConfirmTypePassword] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const userDataFromRedux: UserDataType | null = useAppSelector((state) => state.user.userData);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const changePassword = async () => {
        if (passwordValue.length > 0 &&
            confirmPasswordValue.length > 0 && !!passwordValue.match(PASSWORD_PATTERN)) {
            if (passwordValue === confirmPasswordValue) {
                try {
                    if (userDataFromRedux) {
                        const changedData = {
                            ...userDataFromRedux,
                            password: passwordValue
                        };

                        const resultAction = await dispatch(updateUserData(changedData));
                        const response = unwrapResult(resultAction);

                        if (response) {
                            getAllert({ type: "success", text: response });
                            setIsError(false);
                            setTimeout(() => navigate("/settings"), 1000);
                        }
                    }
                } catch (error) {
                    console.error(error);
                }
            } else {
                getAllert({ type: "error", text: "Passwords must match." });
                setIsError(true);
            }
        } else {
            getAllert({ type: "error", text: "Password must contain at least one digit, one special character '!@#$%^&*', one lowercase letter, one uppercase letter, and should not contain any spaces." });
            setIsError(true);
        }
    }

    const getAllert = (data: AlertComponentProps) => {
        setIsAlertActive({
            text: data.text,
            type: data.type
        });
        setTimeout(() => setIsAlertActive(null), 3000);
    }

    return (
        <div>
            <div>
                <Title>
                    <h5>
                        Enter new password.
                    </h5>
                </Title>
                <SubTitle>
                    <span>
                        Choose a strong password and do not use it for other accounts.
                    </span>
                </SubTitle>
                <Label>
                    <OutlinedInput
                        sx={{
                            marginBottom: "20px",
                            width: "100%",
                            fontSize: "14px"
                        }}
                        onChange={(event) => setPasswordValue(event.target.value)}
                        value={passwordValue}
                        type={isInputTypePassword ? "password" : "text"}
                        size="small"
                        placeholder="Enter your password"
                        error={isError} />
                    <BtnShowPasswordInner>
                        <BtnShowPassword
                            func={() => setIsInputTypePassword(prev => !prev)}
                            isTypePassword={isInputTypePassword} />
                    </BtnShowPasswordInner>
                </Label>
                <Label>
                    <OutlinedInput
                        sx={{
                            marginBottom: "20px",
                            width: "100%",
                            fontSize: "14px"
                        }}
                        onChange={(event) => setConfirmPasswordValue(event.target.value)}
                        value={confirmPasswordValue}
                        type={isInputConfirmTypePassword ? "password" : "text"}
                        size="small"
                        placeholder="Confirm password"
                        error={isError} />
                    <BtnShowPasswordInner>
                        <BtnShowPassword
                            func={() => setIsInputConfirmTypePassword(prev => !prev)}
                            isTypePassword={isInputConfirmTypePassword} />
                    </BtnShowPasswordInner>
                </Label>
                <BtnInner>
                    <ButtonComponent
                        backgroundColor="#5B8A72"
                        BackgroundColorHover="#0f4a34"
                        text="Save"
                        color="#fff"
                        type="button"
                        func={changePassword} />
                </BtnInner>
                {isAlertActive ?
                    <AlertComponent type={isAlertActive.type} text={isAlertActive.text} />
                    : null}
            </div>
        </div>
    )
}