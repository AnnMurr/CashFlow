import { FC, useState } from "react";
import { Button, OutlinedInput } from "@mui/material";
import { FormContainer, Title } from "./styledForm";
import { checkUserData } from "../../../../../api/authApi/authApi";

export const Form: FC = () => {
    const [emailValue, setEmailValue] = useState<string>("");
    const [passwordValue, setPasswordValue] = useState<string>("");

    const logIn = async () => {
        try {
            const data = await checkUserData({ email: emailValue, password: passwordValue})
            console.log("logIn", data)
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
                <Button
                    sx={{
                        backgroundColor: "#699a87",
                        width: "100%",
                        '&:hover': {
                            backgroundColor: "#0f4a34"
                        },
                    }}
                    onClick={logIn}
                    variant="contained">
                    Sign in
                </Button>
            </form>
        </FormContainer>
    )
}