import { ChangeEvent, FC, useContext } from "react";
import { OutlinedInput } from "@mui/material";
import { ThemeContextType } from "contexts/themeContext/types";
import { ThemeContext } from "../../../contexts/themeContext/themeContext";

type InputType =
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';

interface OutlinedInputComponentProps {
    isError?: boolean;
    value: string | undefined | null;
    placeholderValue: string;
    type: InputType;
    maxLengthNumber: number;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const OutlinedInputComponent: FC<OutlinedInputComponentProps> = ({
    isError, value, handleChange, placeholderValue, type, maxLengthNumber }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    return (
        <OutlinedInput
            sx={{
                width: "100%",
                fontSize: "14px",
                color: themeContext.themeStyles.color,

                "@media screen and (max-width: 580px)": {
                    fontSize: "12px",          
                },

                '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: themeContext.themeStyles.inputBorder,
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: themeContext.themeStyles.inputBorderHover,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: themeContext.themeStyles.inputBorderFocused,
                },
            }}
            inputProps={{ maxLength: maxLengthNumber }}
            error={isError}
            value={value}
            onChange={handleChange}
            size="small"
            placeholder={placeholderValue}
            type={type} />
    )
}