import { FC } from "react";
import { Message } from "./styledErrorMessage";

interface ErrorMessageProps {
    text: string;
}

export const ErrorMessage: FC<ErrorMessageProps> = ({ text }) => {
    return (
        <Message>{text}</Message>
    )
}