import { FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setDataToLocalStorage } from "../../../../../storage/localStorage/localStorage";
import { ButtonComponent } from "../../../../shared/button/button";
import { BtnShowPassword } from "../../../../shared/btnShowPassword/btnShowPassword";
import { AlertComponentProps } from "../../../../shared/alert/alert";
import { AuthorizedContext } from "../../../../../contexts/authorizedContext/authorizedContext";
import { checkUserData } from "../../../../../redux/reducers/userReducer/userReducer";
import { useAppDispatch } from "../../../../../redux/store/store";
import { Input } from "./components/input";
import { BtnShowPasswordInner, FormContainer, Label, Title } from "./styledForm";
interface FormProps {
    setIsAlertActive: (value: null | AlertComponentProps) => void;
}

export const Form: FC<FormProps> = ({ setIsAlertActive }) => {
    const [emailValue, setEmailValue] = useState<string>("");
    const [passwordValue, setPasswordValue] = useState<string>("");
    const [isInputTypePassword, setIsInputTypePassword] = useState<boolean>(true);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { login } = useContext(AuthorizedContext);

    const getLogSuccess = (token: string) => {
        setIsAlertActive({ type: "success", text: "User account creation successful" });
        setTimeout(() => {
            setIsAlertActive(null);
            navigate('/profile');
            setDataToLocalStorage("token", token);
            login();
        }, 1000);
    }

    const logIn = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        try {
            const token = (await dispatch(checkUserData({ email: emailValue, password: passwordValue }))).payload;

            if (token && typeof token === "string") {
                getLogSuccess(token);
            } else {
                setIsAlertActive({ type: "error", text: "wrong data" });
                setTimeout(() => setIsAlertActive(null), 3000);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <FormContainer>
            <Title>
                <h2>
                    Sign In
                </h2>
            </Title>
            <form>
                <Input
                    placeholderValue="Email"
                    inputValue={emailValue}
                    setValueFunc={setEmailValue}
                    type="email" />
                <Label>
                    <Input
                        placeholderValue="Password"
                        inputValue={passwordValue}
                        setValueFunc={setPasswordValue}
                        type={isInputTypePassword ? "password" : "text"} />
                    <BtnShowPasswordInner>
                        <BtnShowPassword
                            func={() => setIsInputTypePassword(prev => !prev)}
                            isTypePassword={isInputTypePassword} />
                    </BtnShowPasswordInner>
                </Label>
                <ButtonComponent
                    backgroundColor="#5B8A72"
                    BackgroundColorHover="#0f4a34"
                    text="Sign in"
                    color="#fff"
                    type="submit"
                    func={logIn} />
            </form>
        </FormContainer>
    )
}