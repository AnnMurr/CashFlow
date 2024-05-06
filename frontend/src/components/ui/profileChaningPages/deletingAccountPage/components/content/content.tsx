import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OutlinedInput } from "@mui/material";
import { ButtonComponent } from "../../../../../shared/button/button";
import { AlertComponent, AlertComponentProps } from "../../../../../shared/alert/alert";
import { BtnShowPassword } from "../../../../../shared/btnShowPassword/btnShowPassword";
import { getDataFromLocalStorage } from "../../../../../../storage/localStorage/localStorage";
import { getUserDataById } from "../../../../../../api/authApi/authApi";
import { BtnInner, BtnShowPasswordInner, Label, TextInner, Title } from "./styledContent";

export const Content: FC = () => {
    const [passwordValue, setPasswordValue] = useState<string>("");
    const [isAlertActive, setAlertActive] = useState<null | AlertComponentProps>(null);
    const [isInputTypePassword, setIsInputTypePassword] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const navigate = useNavigate();

    const deleteAccount = async () => {
        try {


        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <div>
                <Title>
                    <h5>
                        Are you sure you want to delete your account?
                    </h5>
                </Title>
                <TextInner>
                    <span>
                        Your account will be permanently deleted. All your information, including data, settings, and activity history, will be lost. Please ensure that you want to delete your account, as this action is irreversible. If you have any doubts, you can cancel this action now.
                    </span>
                </TextInner>
                <BtnInner>
                    <ButtonComponent
                        backgroundColor="#a71616"
                        BackgroundColorHover="#820e0e"
                        text="Confirm"
                        color="#fff"
                        type="button"
                        func={deleteAccount} />
                </BtnInner>
                {isAlertActive ?
                    <AlertComponent type={isAlertActive.type} text={isAlertActive.text} />
                    : null}
            </div>
        </div>
    )
}