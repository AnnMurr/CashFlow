import { FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/store/store";
import { AlertComponentProps } from "../alert/alert";
import { UserDataType } from "../../../redux/reducers/userReducer/types";
import { ThemeContextType } from "../../../contexts/themeContext/types";
import { ThemeContext } from "../../../contexts/themeContext/themeContext";
import { BtnShowPassword } from "../btnShowPassword/btnShowPassword";
import { ButtonComponent } from "../button/button";
import { OutlinedInputComponent } from "../outlinedInput/outlinedInput";
import { BtnInner, BtnShowPasswordInner, Container, Label, Title, Wrapper } from "./styledConfirmAccountModal";

interface ConfirmAccountModalProps {
    setAlertActive: (value: null | AlertComponentProps) => void;
    goToLink: string;
}

export const ConfirmAccountModal: FC<ConfirmAccountModalProps> = ({ setAlertActive, goToLink }) => {
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
                navigate(goToLink);
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
        <Container themestyles={themeContext.themeStyles}>
            <Wrapper>
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
            </Wrapper>
        </Container>
    )
}