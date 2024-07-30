import { FC, useContext } from "react";
import { Button } from "@mui/material";
import { ThemeContextType } from "../../../contexts/themeContext/types";
import { ThemeContext } from "../../../contexts/themeContext/themeContext";

interface ButtonComponentProps {
    backgroundColor?: string;
    BackgroundColorHover?: string;
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
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    const ButtonStyles = {
        backgroundColor: backgroundColor ? backgroundColor : themeContext.themeStyles.buttonBackground,
        color: color,
        width: "100%",
        
        '&:hover': {
            backgroundColor: BackgroundColorHover ? BackgroundColorHover : themeContext.themeStyles.buttonBackgroundHover
        },
        '&.MuiButtonBase-root.MuiButton-root.Mui-disabled': {
            backgroundColor: themeContext.themeStyles.buttonDisabledBackground,
        }
    };

    return (
        <Button
            onClick={func}
            variant="contained"
            type={type}
            disabled={disabledValue}
            sx={ButtonStyles} >
            {text}
        </Button>
    )
}