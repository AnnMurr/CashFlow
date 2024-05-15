import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OutlinedInput } from "@mui/material";
import { EMAIL_PATTERN } from "../../../../../../consts/index";
import { AlertComponent, AlertComponentProps } from "../../../../../shared/alert/alert";
import { ButtonComponent } from "../../../../../shared/button/button";
import { getDataFromLocalStorage } from "../../../../../../storage/localStorage/localStorage";
import { checkUserDataByEmail, getUserDataById, updateUserData } from "../../../../../../api/authApi/authApi";
import { UserDataType } from "../../../../../../api/authApi/authApiTypes";
import { BtnInner, Title } from "./styledContent";

export const Content: FC = () => {
    const [emailValue, setEmailValue] = useState<string>("");
    const [isAlertActive, setIsAlertActive] = useState<null | AlertComponentProps>(null);
    const [userData, setUserData] = useState<UserDataType | null>(null);
    const [isError, setIsError] = useState<boolean>(false);
    const navigate = useNavigate();

    const changeEmail = async () => {
        const token = getDataFromLocalStorage("token");
        const userExists = await checkUserDataByEmail(emailValue);
        const isValid = validateEmail(emailValue);

        try {
            if (userData && emailValue && isValid) {
                if (!userExists) {
                    const changedData = {
                        ...userData,
                        email: emailValue
                    }

                    const response = await updateUserData(token, changedData);

                    if (response) {
                        setIsAlertActive({
                            text: response,
                            type: "success"
                        });
                        setEmailValue(changedData.email);
                        setTimeout(() => navigate("/settings"), 1000);
                    }
                } else {
                    getAlert({ type: "error", text: "User has already registered" });
                }
            } else {
                getAlert({ type: "error", text: "E-mail is incorrect" });
            }
        } catch (error) {
            console.error(error);
        }
    }

    const getUserData = async () => {
        try {
            const token = getDataFromLocalStorage("token");
            const userData = await getUserDataById(token);
            setUserData(userData);

            if (userData) {
                !emailValue && setEmailValue(userData.email);
                return userData;
            } else {
                console.error("User not found");
            }
        } catch (error) {
            console.error(error);
        }
    }

    const validateEmail = (email: string) => {
        if (email.length > 0 && !!email.match(EMAIL_PATTERN)) {
            setIsError(false);
            return true;
        } else {
            setIsError(true);
            return false;
        }
    }

    const getAlert = (data: AlertComponentProps) => {
        setIsAlertActive({
            text: data.text,
            type: data.type
        });
        setTimeout(() => setIsAlertActive(null), 3000);
    }

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <div>
            <div>
                <Title>
                    <h5>
                        Enter new email address.
                    </h5>
                </Title>
                <div>
                    <OutlinedInput
                        sx={{
                            marginBottom: "20px",
                            width: "100%",
                            fontSize: "14px"
                        }}
                        onChange={(event) => setEmailValue(event.target.value)}
                        value={emailValue}
                        size="small"
                        error={!!isError}
                        placeholder="Enter your password" />
                </div>
                <BtnInner>
                    <ButtonComponent
                        disabledValue={userData && userData.email === emailValue ? true : false}
                        backgroundColor="#5B8A72"
                        BackgroundColorHover="#0f4a34"
                        text="Save"
                        color="#fff"
                        type="button"
                        func={changeEmail} />
                </BtnInner>
                {isAlertActive ?
                    <AlertComponent type={isAlertActive.type} text={isAlertActive.text} />
                    : null}
            </div>
        </div>
    )
}