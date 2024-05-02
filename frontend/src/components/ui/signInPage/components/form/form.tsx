import { FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OutlinedInput } from "@mui/material";
import { checkUserData } from "../../../../../api/authApi/authApi";
import { setDataToLocalStorage } from "../../../../../storage/localStorage/localStorage";
import { ButtonComponent } from "../../../../shared/button/button";
import { AlertComponentProps } from "../../../../shared/alert/alert";
import { AuthorizedContext } from "../../../../../contexts/authorizedContext/authorizedContext";
import { FormContainer, Title } from "./styledForm";
interface FormProps {
    setIsAlertActive: (value: null | AlertComponentProps) => void;
}

export const Form: FC<FormProps> = ({ setIsAlertActive }) => {
    const [emailValue, setEmailValue] = useState<string>("");
    const [passwordValue, setPasswordValue] = useState<string>("");
    const navigate = useNavigate();
    const { login } = useContext(AuthorizedContext);

    const logIn = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        try {
            const token = await checkUserData({ email: emailValue, password: passwordValue });

            if (token && typeof token !== "boolean") {
                setIsAlertActive({ type: "success", text: "Successful login." });
                setTimeout(() => {
                    setIsAlertActive(null);
                    setDataToLocalStorage("token", token);
                    login();
                    navigate('/profile');
                }, 1000);
            } else {
                setIsAlertActive({ type: "error", text: "wrong data." });
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
                <OutlinedInput
                    sx={{
                        marginBottom: "20px",
                        width: "100%",
                        fontSize: "14px",
                        // "& .MuiOutlinedInput-input": {
                        //     color: "#43434387 !important" 
                        // },
                        // "& .MuiOutlinedInput-notchedOutline": {
                        //     borderColor: "#43434387 !important"
                        // }
                    }}
                    size="small"
                    placeholder="Email"
                    value={emailValue}
                    onChange={(event) => setEmailValue((prev) => prev = event.target.value)} />
                <OutlinedInput
                    sx={{
                        marginBottom: "20px",
                        width: "100%",
                        fontSize: "14px",
                    }}
                    size="small"
                    placeholder="Password"
                    value={passwordValue}
                    onChange={(event) => setPasswordValue((prev) => prev = event.target.value)} />
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