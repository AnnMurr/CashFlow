import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OutlinedInput } from "@mui/material";
import { AlertComponent, AlertComponentProps } from "../../../../../shared/alert/alert";
import { ButtonComponent } from "../../../../../shared/button/button";
import { getDataFromLocalStorage } from "../../../../../../storage/localStorage/localStorage";
import { getUserDataById, updateUserData } from "../../../../../../api/authApi/authApi";
import { UserDataType } from "../../../../../../api/authApi/authApiTypes";
import { BtnInner, Title } from "./styledContent";

export const Content: FC = () => {
    const [emailValue, setEmailValue] = useState<string>("");
    const [isAlertActive, setIsAlertActive] = useState<null | AlertComponentProps>(null);
    const [userData, setUserData] = useState<UserDataType | null>(null); 
    const navigate = useNavigate();

    const changeEmail = async () => {
        const token = getDataFromLocalStorage("token");

        try {
            if (userData && emailValue) {
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
                !emailValue && setEmailValue(response.email);
                console.log(response.email);
            }

        } catch (error) {
            console.error(error);
        }
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
                        placeholder="Enter your password" />
                </div>
                <BtnInner>
                    <ButtonComponent
                        disabledValue={userData && userData.email === emailValue ? true : false}
                        backgroundColor="#5B8A72"
                        BackgroundColorHover="#0f4a34"
                        text="Next"
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