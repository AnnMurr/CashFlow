import { FC, useState } from "react";
import { OutlinedInput } from "@mui/material";
import { checkUserData } from "../../../../../api/authApi/authApi";
import { setDataToLocalStorage } from "../../../../../storage/localStorage/localStorage";
import { ButtonComponent } from "../../../../shared/button/button";
import { FormContainer, Title } from "./styledForm";
import { useNavigate } from "react-router-dom";

export const Form: FC = () => {
    const [emailValue, setEmailValue] = useState<string>("");
    const [passwordValue, setPasswordValue] = useState<string>("");
    const navigate = useNavigate();

    const logIn = async (event: any) => {
        event.preventDefault();
        
        try {
            const token = await checkUserData({ email: emailValue, password: passwordValue });

            console.log(token)
            if (token) {
                setDataToLocalStorage("token", token);
                navigate('/profile');
            } else {
                console.log("wrong data");
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