import { Alert } from "@mui/material";
import { FC } from "react";
import { Container } from "./styledAlertComponent";

export interface AlertComponentProps {
    type: 'error' | 'warning' | 'info' | 'success';
    text: string;
}

export const AlertComponent: FC<AlertComponentProps> = ({ type, text }) => {
    return (
        <Container>
            <Alert severity={type}>{text}</Alert>
        </Container>
    )
}