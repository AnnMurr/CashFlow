import { FC } from "react";
import { Button } from "@mui/material";

interface ButtonComponentProps {
    backgroundColor: string;
    BackgroundColorHover: string;
    text: string;
    color: string;
    disabledValue?: boolean;
    type: "button" | "submit" | "reset";
    func?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ButtonComponent: FC<ButtonComponentProps> = ({
    backgroundColor,
    BackgroundColorHover,
    text,
    color,
    disabledValue,
    type,
    func }) => {
    return (
        <Button
            onClick={func}
            variant="contained"
            type={type}
            disabled={disabledValue}
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