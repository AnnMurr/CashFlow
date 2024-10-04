import { ChangeEvent, FC } from "react";
import { OutlinedInput } from "@mui/material";

interface InputProps {
    placeholderValue: string;
    type: string;
    inputValue: string;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<InputProps> = ({ inputValue, placeholderValue, type, handleChange }) => {
    return (
        <OutlinedInput
            type={type}
            value={inputValue}
            sx={{
                marginBottom: "20px",
                width: "100%",
                fontSize: "14px"
            }}
            size="small"
            placeholder={placeholderValue}
            onChange={handleChange} />
    )
}