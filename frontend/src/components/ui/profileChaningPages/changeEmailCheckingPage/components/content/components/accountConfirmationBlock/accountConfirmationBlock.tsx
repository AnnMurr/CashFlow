import { FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BtnShowPassword } from "../../../../../../../shared/btnShowPassword/btnShowPassword";
import { ButtonComponent } from "../../../../../../../shared/button/button";
import { AlertComponentProps } from "../../../../../../../shared/alert/alert";
import { useAppSelector } from "../../../../../../../../redux/store/store";
import { UserDataType } from "../../../../../../../../redux/reducers/userReducer/types";
import { ThemeContextType } from "../../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../../contexts/themeContext/themeContext";
import { OutlinedInputComponent } from "../../../../../../../../components/shared/outlinedInput/outlinedInput";
import { BtnInner, BtnShowPasswordInner, Label, Title } from "./styledAccountConfirmationBlock";

interface AccountConfirmationBlockProps {
    setAlertActive: (value: null | AlertComponentProps) => void;
}

export const AccountConfirmationBlock: FC<AccountConfirmationBlockProps> = ({ setAlertActive }) => {
    const [passwordValue, setPasswordValue] = useState<string>("");
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
            }

            if (userDataFromRedux && userDataFromRedux.password === passwordValue) {
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
                <Title themestyles={themeContext.themeStyles}>
                    <h5>
                        Confirm your account
                    </h5>
                </Title>
                <div>
                    <Label>
                        <OutlinedInputComponent
                            maxLengthNumber={30}
                            isError={isError}
                            value={passwordValue}
                            handleChange={(event) => setPasswordValue(event.target.value)}
                            placeholderValue={"Enter your password"}
                            type={isInputTypePassword ? "password" : "text"} />
                        <BtnShowPasswordInner>
                            <BtnShowPassword
                                func={() => setIsInputTypePassword((prev) => !prev)}
                                isTypePassword={isInputTypePassword}
                            />
                        </BtnShowPasswordInner>
                    </Label>
                </div>
                <BtnInner>
                    <ButtonComponent
                        text="Next"
                        color="#fff"
                        type="button"
                        func={checkPassword}
                    />
                </BtnInner>
            </div>
        </div>
    )
}