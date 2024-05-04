import { FC, useState } from "react";
import { OutlinedInput } from "@mui/material";
import { ButtonComponent } from "../../../../../shared/button/button";
import { AlertComponent, AlertComponentProps } from "../../../../../shared/alert/alert";
import { getDataFromLocalStorage } from "../../../../../../storage/localStorage/localStorage";
import { getUserDataById } from "../../../../../../api/authApi/authApi";
import { BtnInner, Title } from "./styledContent";
import { useNavigate } from "react-router-dom";

export const Content: FC = () => {
    const [passwordValue, setPasswordValue] = useState<string>("");
    const [isAlertActive, setAlertActive] = useState<null | AlertComponentProps>(null);
    const navigate = useNavigate();

    const checkPassword = async () => {
        try {
            const token = await getDataFromLocalStorage("token");
            const userData = await getUserDataById(token);

            if (!userData) {
                setAlertActive({ type: "error", text: "User not found" });
                setTimeout(() => setAlertActive(null), 3000);
                console.error("User not found");
            }

            if (userData && userData.password === passwordValue) {
                navigate("/settings/change-password-modification");
            } else {
                setAlertActive({ type: "error", text: "Invalid password" })
                setTimeout(() => setAlertActive(null), 3000);
                console.error("Invalid password");
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
                        Confirm your account.
                    </h5>
                </Title>
                <div>
                    <OutlinedInput
                        sx={{
                            marginBottom: "20px",
                            width: "100%",
                            fontSize: "14px"
                        }}
                        onChange={(event) => setPasswordValue(event.target.value)}
                        value={passwordValue}
                        size="small"
                        placeholder="Enter your password" />
                </div>
                <BtnInner>
                    <ButtonComponent
                        backgroundColor="#5B8A72"
                        BackgroundColorHover="#0f4a34"
                        text="Next"
                        color="#fff"
                        type="button"
                        func={checkPassword} />
                </BtnInner>
                {isAlertActive ?
                    <AlertComponent type={isAlertActive.type} text={isAlertActive.text} />
                    : null}
            </div>
        </div>
    )
}