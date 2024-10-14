import { FC, useContext } from "react";
import { Button } from "@mui/material";
import { ThemeContextType } from "../../../contexts/themeContext/types";
import { ThemeContext } from "../../../contexts/themeContext/themeContext";

interface ButtonComponentProps {
    backgroundColor?: string;
    BackgroundColorHover?: string;
    borberColorHover?: string;
    text: string;
    color: string;
    disabledValue?: boolean;
    type: "button" | "submit" | "reset";
    func?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ButtonComponent: FC<ButtonComponentProps> = ({
    backgroundColor,
    BackgroundColorHover,
    borberColorHover,
    text,
    color,
    disabledValue,
    type,
    func }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    const buttonStyles = {
        backgroundColor: backgroundColor ? backgroundColor : themeContext.themeStyles.buttonBackground,
        border: "1px solid transparent",
        color: color,
        width: "100%",

        '&.MuiButtonBase-root.MuiButton-root.Mui-disabled': {
            backgroundColor: themeContext.themeStyles.buttonDisabledBackground,
        },

        '&:hover': {
            backgroundColor: BackgroundColorHover ? BackgroundColorHover : themeContext.themeStyles.buttonBackgroundHover,
            border: borberColorHover && `1px solid ${borberColorHover}`,
            color: borberColorHover && borberColorHover,
        },

        "@media screen and (max-width: 580px)": {
            fontSize: "13px",   
        }
    };

    return (
        <Button
            onClick={func}
            variant="contained"
            type={type}
            disabled={disabledValue}
            sx={buttonStyles} >
            {text}
        </Button>
    )
}