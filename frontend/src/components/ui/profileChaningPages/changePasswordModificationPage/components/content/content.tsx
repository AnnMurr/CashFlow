import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OutlinedInput } from "@mui/material";
import { AlertComponent, AlertComponentProps } from "../../../../../shared/alert/alert";
import { ButtonComponent } from "../../../../../shared/button/button";
import { getDataFromLocalStorage } from "../../../../../../storage/localStorage/localStorage";
import { getUserDataById, updateUserData } from "../../../../../../api/authApi/authApi";
import { UserDataType } from "../../../../../../api/authApi/authApiTypes";
import { BtnInner, SubTitle, Title } from "./styledContent";

export const Content: FC = () => {
    const [passwordValue, setPasswordValue] = useState<string>("");
    const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>("");
    const [isAlertActive, setIsAlertActive] = useState<null | AlertComponentProps>(null);
    const [userData, setUserData] = useState<UserDataType | null>(null); 
    const navigate = useNavigate();

    const changeEmail = async () => {
        const token = getDataFromLocalStorage("token");

        try {
            if (userData && passwordValue) {
                    const changedData = {
                        ...userData,
                        password: passwordValue
                    }
    
                    const response = await updateUserData(token, changedData);
    
                    if (response) {
                        setIsAlertActive({
                            text: response,
                            type: "success"
                        });
                        setPasswordValue(changedData.email);
                        setTimeout(() => {
                            navigate("/settings");
                        }, 1000);
                    }
            } else {
                setIsAlertActive({
                    text: "User not found",
                    type: "error"
                });
                setTimeout(() => setIsAlertActive(null), 3000);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const getUserData = async () => {
        try {
            const token = getDataFromLocalStorage("token");
            const response = await getUserDataById(token);
            setUserData(response);

            if (response) {
                !passwordValue && setPasswordValue(response.email);
                console.log(response.email);
            }

        } catch (error) {
            console.error(error);
        }
    }



    return (
        <div>
            <div>
                <Title>
                    <h5>
                        Enter new password.
                    </h5>
                </Title>
                <SubTitle>
                    <span>
                    Choose a strong password and do not use it for other accounts.
                    </span>
                </SubTitle>
                <div>
                    <OutlinedInput
                        sx={{
                            marginBottom: "20px",
                            width: "100%",
                            fontSize: "14px"
                        }}
                        onChange={(event) => setPasswordValue(event.target.value)}
                        value={passwordValue}
                        type="password"
                        size="small"
                        placeholder="Enter your password" />
                </div>
                <div>
                    <OutlinedInput
                        sx={{
                            marginBottom: "20px",
                            width: "100%",
                            fontSize: "14px"
                        }}
                        onChange={(event) => setConfirmPasswordValue(event.target.value)}
                        value={confirmPasswordValue}
                        type="password"
                        size="small"
                        placeholder="Confirm password" />
                </div>
                <BtnInner>
                    <ButtonComponent
                        disabledValue={userData && userData.email === passwordValue ? true : false}
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