import { OutlinedInput } from "@mui/material";
import { FC } from "react";

interface InputProps {
    inputValue: string;
    placeholderValue: string;
    setValueFunc: (value: string) => void;
    type: string;
}

export const Input: FC<InputProps> = ({ inputValue, placeholderValue, setValueFunc, type }) => {
    return (
        <OutlinedInput
            sx={{
                marginBottom: "20px",
                width: "100%",
                fontSize: "14px",
            }}
            size="small"
            placeholder={placeholderValue}
            value={inputValue}
            type={type}
            onChange={(event) => setValueFunc(event.target.value)} />
    )
}