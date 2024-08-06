import { ChangeEvent, FC, useContext } from "react";
import FormLabel from '@mui/joy/FormLabel';
import Radio from '@mui/joy/Radio';
import Sheet from '@mui/joy/Sheet';
import { Box } from "@mui/material";
import { ThemeContextType } from "../../../../../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../../../../../contexts/themeContext/themeContext";

interface RadioComponentProps {
    children: React.ReactNode;
    value: string;
    checked: boolean;
}

export const RadioComponent: FC<RadioComponentProps> = ({ children, value, checked }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    const sheetStyles = {
        maxWidth: "20rem",
        borderRadius: "5px",
        backgroundColor: themeContext.themeStyles.themeSelectionBlockBackground,
        border: `1px solid ${themeContext.themeStyles.color}`,
        transition: "all 0.3s ease-in-out",

        '&:hover': {
            opacity: 0.6,
        },
        '.Mui-checked': {
            borderRadius: "5px",
            border: `2px solid ${themeContext.themeStyles.color}`,
        },
    };

    const boxStyles = {
        display: 'flex',
        marginRight: 'auto',
        padding: "10px",
    };

    const labelStyles = {
        paddingRight: "10px",
        color: themeContext.themeStyles.color
    };

    const changeTheme = (event: ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        const value = target.value.toLowerCase() as 'green' | 'dark';

        themeContext.changeTheme(value);
    }

    return (
        <Sheet
            variant="outlined"
            sx={sheetStyles} >
            {children}
            <Box
                sx={boxStyles}>
                <FormLabel
                    sx={labelStyles} >
                    {value}
                </FormLabel>
                <Radio
                    checked={checked}
                    onChange={changeTheme}
                    value={value}
                    color="neutral" />
            </Box>
        </Sheet>
    )
}