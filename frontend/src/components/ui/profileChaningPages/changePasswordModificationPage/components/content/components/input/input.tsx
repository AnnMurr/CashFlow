import { ChangeEvent, FC, useState } from "react";
import { OutlinedInputComponent } from "../../../../../../../shared/outlinedInput/outlinedInput";
import { BtnShowPassword } from "../../../../../../../shared/btnShowPassword/btnShowPassword";
import { PasswordType } from "../../content";
import { BtnShowPasswordInner, Label } from "./styledInput";

interface PasswordVisibleType {
    password: boolean;
    confirmPassword: boolean;
}

interface InputProps {
    isError: boolean;
    passwordValue: PasswordType;
    placeholderText: string;
    typeValue: 'password' | 'confirmPassword';
    setPasswordValue: (value: PasswordType) => void;
}

export const Input: FC<InputProps> = ({
    isError, passwordValue, placeholderText, typeValue, setPasswordValue }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState<PasswordVisibleType>({ password: true, confirmPassword: true });

    const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
        setIsPasswordVisible((prevState) => ({
            ...prevState,
            [field]: !prevState[field]
        }));
    };

    const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPasswordValue({
            ...passwordValue,
            [typeValue]: event.target.value,
        })
    }
    return (
        <Label>
            <OutlinedInputComponent
                isError={isError}
                value={passwordValue[typeValue]}
                placeholderValue={placeholderText}
                type={isPasswordVisible[typeValue] ? "password" : "text"}
                maxLengthNumber={30}
                handleChange={handleChangePassword} />
            <BtnShowPasswordInner>
                <BtnShowPassword
                    func={() => togglePasswordVisibility(typeValue)}
                    isTypePassword={isPasswordVisible[typeValue]} />
            </BtnShowPasswordInner>
        </Label>
    )
}