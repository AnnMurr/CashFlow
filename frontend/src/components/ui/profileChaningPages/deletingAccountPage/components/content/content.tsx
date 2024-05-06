import { FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonComponent } from "../../../../../shared/button/button";
import { AlertComponent, AlertComponentProps } from "../../../../../shared/alert/alert";
import { getDataFromLocalStorage, removeDataFromLocalStorage } from "../../../../../../storage/localStorage/localStorage";
import { deleteUserData } from "../../../../../../api/authApi/authApi";
import { deleteUserStore } from "../../../../../../api/userDataApi/userDataApi";
import { AuthorizedContext, AuthorizedContextType } from "../../../../../../contexts/authorizedContext/authorizedContext";
import { BtnInner, TextInner, Title } from "./styledContent";

export const Content: FC = () => {
    const [isAlertActive, setAlertActive] = useState<null | AlertComponentProps>(null);
    const authorizedContext = useContext<AuthorizedContextType>(AuthorizedContext);
    const navigate = useNavigate();

    const deleteAccount = async () => {
        const token = await getDataFromLocalStorage("token");

        try {
            const responseFromStore = await deleteUserStore(token);

            if (responseFromStore.status !== 200) {
                setAlertActive({ type: "error", text: "Error deleting user's data storage" });
                return
            }
            const responseFromDb = await deleteUserData(token);

            if (responseFromDb.status !== 200) {
                const responseMessage = responseFromDb.message
                responseMessage.then(result => {
                    setAlertActive({ type: "error", text: result });
                })
            } else {
                const responseMessage = responseFromDb.message
                responseMessage.then(result => {
                    setAlertActive({ type: "success", text: result });
                    setTimeout(() => {
                        removeDataFromLocalStorage("token");
                        authorizedContext.logOut();
                        navigate("/");
                    }, 1000);
                })
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