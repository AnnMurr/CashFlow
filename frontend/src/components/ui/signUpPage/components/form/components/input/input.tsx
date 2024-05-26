import { FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { OutlinedInput } from "@mui/material";

interface InputProps {
    register: UseFormRegisterReturn;
    isError: boolean;
    placeholderValue: string;
    type: string;
}

export const Input: FC<InputProps> = ({ register, isError, placeholderValue, type }) => {
    return (
        <OutlinedInput
            {...register}
            error={isError}
            type={type}
            sx={{
                marginBottom: "20px",
                width: "100%",
                fontSize: "14px"
            }}
            size="small"
            placeholder={placeholderValue} />
    )
}