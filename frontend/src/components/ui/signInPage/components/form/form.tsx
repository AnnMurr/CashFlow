import { FC } from "react";
import { Button, OutlinedInput } from "@mui/material";
import { FormContainer, Title } from "./styledForm";

export const Form: FC = () => {
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
                    size="small" placeholder="Email" />
                <OutlinedInput
                    sx={{
                        marginBottom: "20px",
                        width: "100%",
                        fontSize: "14px",
                    }}
                    size="small" placeholder="Password" />
                
                <Button sx={{
                    backgroundColor: "#699a87",
                    width: "100%",
                    '&:hover': {
                        backgroundColor: "#0f4a34"
                    },
                }} variant="contained" color="success">
                    Sign in
                </Button>
            </form>
        </FormContainer>
    )
}