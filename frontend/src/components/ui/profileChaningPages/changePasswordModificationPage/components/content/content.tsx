import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OutlinedInput } from "@mui/material";
import { AlertComponent, AlertComponentProps } from "../../../../../shared/alert/alert";
import { ButtonComponent } from "../../../../../shared/button/button";
import { BtnShowPassword } from "../../../../../shared/btnShowPassword/btnShowPassword";
import { getDataFromLocalStorage } from "../../../../../../storage/localStorage/localStorage";
import { PASSWORD_PATTERN } from "../../../../../../consts/index";
import { getUserDataById, updateUserData } from "../../../../../../api/authApi/authApi";
import { BtnInner, BtnShowPasswordInner, Label, SubTitle, Title } from "./styledContent";

export const Content: FC = () => {
    const [passwordValue, setPasswordValue] = useState<string>("");
    const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>("");
    const [isAlertActive, setIsAlertActive] = useState<null | AlertComponentProps>(null);
    const [isInputTypePassword, setIsInputTypePassword] = useState<boolean>(true);
    const [isInputConfirmTypePassword, setIsInputConfirmTypePassword] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const navigate = useNavigate();

    const changePassword = async () => {
        const token = getDataFromLocalStorage("token");

        if (passwordValue.length > 0
            && confirmPasswordValue.length > 0
            && !!passwordValue.match(PASSWORD_PATTERN)) {
            if (passwordValue === confirmPasswordValue) {
                const userData = await getUserDataById(token);

                const changedData = {
                    ...userData,
                    password: passwordValue
                };

                const response = await updateUserData(token, changedData);

                if (response) {
                    getAllert({ type: "success", text: response });
                    setIsError(false);
                    setTimeout(() => navigate("/settings"), 1000);
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