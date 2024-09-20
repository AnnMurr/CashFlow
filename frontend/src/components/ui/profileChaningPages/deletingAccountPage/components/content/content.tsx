import { FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonComponent } from "../../../../../shared/button/button";
import { AlertComponent, AlertComponentProps } from "../../../../../shared/alert/alert";
import { getDataFromLocalStorage, removeDataFromLocalStorage } from "../../../../../../storage/localStorage/localStorage";
import { AuthorizedContext, AuthorizedContextType } from "../../../../../../contexts/authorizedContext/authorizedContext";
import { deleteUserStore } from "../../../../../../redux/reducers/userStorageReduser/userStorageReduser";
import { deleteUserData } from "../../../../../../redux/reducers/userReducer/userReducer";
import { useAppDispatch } from "../../../../../../redux/store/store";
import { ThemeContextType } from "../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../contexts/themeContext/themeContext";
import { BtnInner, Container, TextInner, Title, Wrapper } from "./styledContent";

export const Content: FC = () => {
    const [isAlertActive, setAlertActive] = useState<null | AlertComponentProps>(null);
    const authorizedContext = useContext<AuthorizedContextType>(AuthorizedContext);
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const deleteAccount = async () => {
        const token = getDataFromLocalStorage("token");
        try {
            await dispatch(deleteUserStore(token));

            const responseFromDb = await dispatch(deleteUserData());
            const { status, message } = responseFromDb.payload as { status: number; message: string };

            if (responseFromDb && status !== 200) {
                setAlertActive({ type: "error", text: message });
            } else {
                setAlertActive({ type: "success", text: message });
                setTimeout(() => {
                    removeDataFromLocalStorage("token");
                    authorizedContext.logOut();
                    navigate("/");
                }, 1000);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container themestyles={themeContext.themeStyles}>
            <Wrapper>
                <Title themestyles={themeContext.themeStyles}>
                    <h5>
                        Are you sure you want to delete your account?
                    </h5>
                </Title>
                <TextInner themestyles={themeContext.themeStyles}>
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
            </Wrapper>
        </Container>
    )
}