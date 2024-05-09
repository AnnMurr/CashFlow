import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OutlinedInput } from "@mui/material";
import { ButtonComponent } from "../../../../../shared/button/button";
import { AlertComponent, AlertComponentProps } from "../../../../../shared/alert/alert";
import { BtnShowPassword } from "../../../../../shared/btnShowPassword/btnShowPassword";
import { getDataFromLocalStorage } from "../../../../../../storage/localStorage/localStorage";
import { getUserDataById } from "../../../../../../api/authApi/authApi";
import { BtnInner, BtnShowPasswordInner, Label, Title } from "./styledContent";

export const Content: FC = () => {
    const [passwordValue, setPasswordValue] = useState<string>("");
    const [isAlertActive, setAlertActive] = useState<null | AlertComponentProps>(null);
    const [isInputTypePassword, setIsInputTypePassword] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const navigate = useNavigate();

    const checkPassword = async () => {
        try {
            const token = await getDataFromLocalStorage("token");
            const userData = await getUserDataById(token);

            if (!userData) {
                setAlertActive({ type: "error", text: "User not found" });
                setTimeout(() => setAlertActive(null), 3000);
            }

            if (userData && userData.password === passwordValue) {
                navigate("/settings/change-email-modification");
            } else {
                setAlertActive({ type: "error", text: "Invalid password" })
                setTimeout(() => setAlertActive(null), 3000);
                setIsError(true);
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <div>
                <Title>
                    <h5>
                        Confirm your account.
                    </h5>
                </Title>
                <div>
                    <Label>
                        <OutlinedInput
                            sx={{
                                marginBottom: "20px",
                                width: "100%",
                                fontSize: "14px"
                            }}
                            onChange={(event) => setPasswordValue(event.target.value)}
                            value={passwordValue}
                            size="small"
                            placeholder="Enter your password"
                            error={isError}
                            type={isInputTypePassword ? "password" : "text"} />
                        <BtnShowPasswordInner>
                            <BtnShowPassword
                                func={() => setIsInputTypePassword(prev => !prev)}
                                isTypePassword={isInputTypePassword} />
                        </BtnShowPasswordInner>
                    </Label>
                </div>
                <BtnInner>
                    <ButtonComponent
                        backgroundColor="#5B8A72"
                        BackgroundColorHover="#0f4a34"
                        text="Next"
                        color="#fff"
                        type="button"
                        func={checkPassword} />
                </BtnInner>
                {isAlertActive ?
                    <AlertComponent type={isAlertActive.type} text={isAlertActive.text} />
                    : null}
            </div>
        </div>
    )
}