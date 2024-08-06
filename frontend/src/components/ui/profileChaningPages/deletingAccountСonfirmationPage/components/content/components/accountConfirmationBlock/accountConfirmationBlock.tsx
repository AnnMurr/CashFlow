import { FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OutlinedInput } from "@mui/material";
import { BtnShowPassword } from "../../../../../../../shared/btnShowPassword/btnShowPassword";
import { ButtonComponent } from "../../../../../../../shared/button/button";
import { AlertComponentProps } from "../../../../../../../shared/alert/alert";
import { useAppSelector } from "../../../../../../../../redux/store/store";
import { UserDataType } from "../../../../../../../../redux/reducers/userReducer/types";
import { ThemeContextType } from "../../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../../contexts/themeContext/themeContext";
import { BtnInner, BtnShowPasswordInner, Label, Title } from "./styledAccountConfirmationBlock";

interface AccountConfirmationBlockProps {
    setAlertActive: (value: null | AlertComponentProps) => void;
}

export const AccountConfirmationBlock: FC<AccountConfirmationBlockProps> = ({ setAlertActive }) => {
    const [passwordValue, setPasswordValue] = useState<string>("");
    const [isInputTypePassword, setIsInputTypePassword] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const userDataFromRedux: UserDataType | null = useAppSelector((state) => state.user.userData);
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    const navigate = useNavigate();

    const checkPassword = async () => {
        try {
            if (!userDataFromRedux) {
                setAlertActive({ type: "error", text: "User not found" });
                setTimeout(() => setAlertActive(null), 3000);
                setIsError(true);
            }

            if (userDataFromRedux && userDataFromRedux.password === passwordValue) {
                navigate("/settings/deleting-account");
            } else {
                setAlertActive({ type: "error", text: "Invalid password" });
                setTimeout(() => setAlertActive(null), 3000);
                setIsError(true);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <Title themestyles={themeContext.themeStyles}>
                <h5>
                    Confirm your account
                </h5>
            </Title>
            <Label>
                <OutlinedInput
                    sx={{
                        marginBottom: "20px",
                        width: "100%",
                        fontSize: "14px",
                        color: themeContext.themeStyles.color,

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
                    onChange={(event) => setPasswordValue(event.target.value)}
                    value={passwordValue}
                    size="small"
                    type={isInputTypePassword ? "password" : "text"}
                    placeholder="Enter your password"
                    error={isError} />
                <BtnShowPasswordInner>
                    <BtnShowPassword
                        func={() => setIsInputTypePassword(prev => !prev)}
                        isTypePassword={isInputTypePassword} />
                </BtnShowPasswordInner>
            </Label>
            <BtnInner>
                <ButtonComponent
                    text="Next"
                    color="#fff"
                    type="button"
                    func={checkPassword} />
            </BtnInner>
        </div>
    )
}