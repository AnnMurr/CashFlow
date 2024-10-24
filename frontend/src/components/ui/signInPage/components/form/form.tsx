import { FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setDataToLocalStorage } from "../../../../../storage/localStorage/localStorage";
import { AuthorizedContext } from "../../../../../contexts/authorizedContext/authorizedContext";
import { checkUserData } from "../../../../../redux/reducers/userReducer/userReducer";
import { useAppDispatch } from "../../../../../redux/store/store";
import { showAlert } from "../../../../../utils/showAlert";
import { AlertComponentProps } from "../../../../shared/alert/alert";
import { getDataFromUserStore } from "../../../../../redux/reducers/userStorageReduser/userStorageReduser";
import { BtnShowPassword, ButtonComponent, SignUpWithGoogle } from ".";
import { Input } from "./components/input/input";
import { LinkToSignUpBlock } from "./components/linkToSignUpBlock/linkToSignUpBlock";
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
        dispatch(getDataFromUserStore(token));
        showAlert({ type: "success", text: "User account creation successful" }, setIsAlertActive, 3000);
        setTimeout(() => {
            setDataToLocalStorage("token", token);
            login();
            navigate('/profile');
        }, 1000);
    }

    const logIn = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        try {
            const token = (await dispatch(checkUserData({ email: emailValue, password: passwordValue }))).payload;

            token && typeof token === "string" ?
                getLogSuccess(token) :
                showAlert({ type: "error", text: "wrong data" }, setIsAlertActive, 3000);
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
                    handleChange={(event) => setEmailValue(event.target.value)}
                    type="email" />
                <Label>
                    <Input
                        placeholderValue="Password"
                        inputValue={passwordValue}
                        handleChange={(event) => setPasswordValue(event.target.value)}
                        type={isInputTypePassword ? "password" : "text"} />
                    <BtnShowPasswordInner>
                        <BtnShowPassword
                            func={() => setIsInputTypePassword(prev => !prev)}
                            isTypePassword={isInputTypePassword} />
                    </BtnShowPasswordInner>
                </Label>
                <div>
                    <ButtonComponent
                        backgroundColor="#171717"
                        BackgroundColorHover="transparent"
                        borberColorHover="#171717"
                        disabledValue={false}
                        text="Sign in"
                        color="#fff"
                        type="submit"
                        func={logIn} />
                </div>
                <SignUpWithGoogle getLogSuccess={getLogSuccess} setIsAlertActive={setIsAlertActive} />
                <LinkToSignUpBlock />
            </form>
        </FormContainer>
    )
}