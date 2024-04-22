import { FC } from "react";
import { Button, OutlinedInput } from "@mui/material";
import { FormContainer, Title } from "./styledForm";

export const Form: FC = () => {
    return (
        <FormContainer>
            <Title>
                <h2>
                    Sign Up
                </h2>
            </Title>
            <form noValidate autoComplete="off">
                <OutlinedInput
                    sx={{
                        marginBottom: "20px",
                        width: "100%",
                        // "& .MuiOutlinedInput-input": {
                        //     color: "#43434387 !important" 
                        // },
                        // "& .MuiOutlinedInput-notchedOutline": {
                        //     borderColor: "#43434387 !important"
                        // }
                    }}
                    size="small" placeholder="Name" />
                <OutlinedInput
                    sx={{
                        marginBottom: "20px",
                        width: "100%"
                    }}
                    size="small" placeholder="Email" />
                <OutlinedInput
                    sx={{
                        marginBottom: "20px",
                        width: "100%"
                    }}
                    size="small" placeholder="Password" />
                <OutlinedInput
                    sx={{
                        marginBottom: "20px",
                        width: "100%"
                    }}
                    size="small" placeholder="Repeat password" />
                <Button sx={{
                    backgroundColor: "#699a87",
                    width: "100%",
                    '&:hover': {
                        backgroundColor: "#0f4a34"
                    },
                }} variant="contained" color="success">
                    Sign up
                </Button>
            </form>
        </FormContainer>
    )
}