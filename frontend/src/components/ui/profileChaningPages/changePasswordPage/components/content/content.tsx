import { FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonComponent } from "../../../../../shared/button/button";
import { AlertComponent, AlertComponentProps } from "../../../../../shared/alert/alert";
import { BtnShowPassword } from "../../../../../shared/btnShowPassword/btnShowPassword";
import { UserDataType } from "../../../../../../redux/reducers/userReducer/types";
import { useAppSelector } from "../../../../../../redux/store/store";
import { ThemeContextType } from "../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../contexts/themeContext/themeContext";
import { OutlinedInputComponent } from "../../../../../../components/shared/outlinedInput/outlinedInput";
import { BtnInner, BtnShowPasswordInner, Label, Title, Wrapper } from "./styledContent";

export const Content: FC = () => {
    const [passwordValue, setPasswordValue] = useState<string>("");
    const [isAlertActive, setAlertActive] = useState<null | AlertComponentProps>(null);
    const [isInputTypePassword, setIsInputTypePassword] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const userDataFromRedux: UserDataType | null = useAppSelector((state) => state.user.userData);
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    const navigate = useNavigate();

    const checkPassword = async () => {
        try {
            if (!userDataFromRedux) {
                setAlertActive({ type: "error", text: "User not found" });
                setTimeout(() => setAlertActive(null), 3000);
                setIsError(true);
            }

            if (userDataFromRedux && userDataFromRedux.password === passwordValue) {
                navigate("/settings/change-password-modification");
            } else {
                setAlertActive({ type: "error", text: "Invalid password" });
                setTimeout(() => setAlertActive(null), 3000);
                setIsError(true);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Wrapper themestyles={themeContext.themeStyles}>
            <Title themestyles={themeContext.themeStyles}>
                <h5>
                    Confirm your account
                </h5>
            </Title>
            <Label>
                <OutlinedInputComponent
                    isError={isError}
                    value={passwordValue}
                    placeholderValue={"Enter your password"}
                    type={isInputTypePassword ? "password" : "text"}
                    maxLengthNumber={30}
                    handleChange={(event) => setPasswordValue(event.target.value)} />
                <BtnShowPasswordInner>
                    <BtnShowPassword
                        func={() => setIsInputTypePassword(prev => !prev)}
                        isTypePassword={isInputTypePassword} />
                </BtnShowPasswordInner>
            </Label>
            <BtnInner>
                <ButtonComponent
                    text="Next"
                    color="#fff"
                    type="button"
                    func={checkPassword} />
            </BtnInner>
            {isAlertActive ?
                <AlertComponent type={isAlertActive.type} text={isAlertActive.text} />
                : null}
        </Wrapper>
    )
}