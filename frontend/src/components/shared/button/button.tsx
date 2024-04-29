import { FC } from "react";
import { Button } from "@mui/material";

interface ButtonComponentProps {
    backgroundColor: string;
    BackgroundColorHover: string;
    text: string;
    color: string;
    type: "button" | "submit" | "reset";
    func?: () => void;
}

export const ButtonComponent: FC<ButtonComponentProps> = ({
    backgroundColor,
    BackgroundColorHover,
    text,
    color,
    type,
    func }) => {
    return (
        <Button
            onClick={func}
            variant="contained"
            type={type}
            sx={{
                backgroundColor: backgroundColor,
                color: color,
                width: "100%",
                '&:hover': {
                    backgroundColor: BackgroundColorHover
                },
            }} >
            {text}
        </Button>
    )
}