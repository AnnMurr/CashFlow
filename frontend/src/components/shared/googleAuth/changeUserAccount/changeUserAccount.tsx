import { FC, useContext } from "react";
import { ButtonComponent } from "../../../shared/button/button";
import { signInWithGoogle } from "../../../../utils/firebase/firebase";
import { useAppDispatch, useAppSelector } from "../../../../redux/store/store";
import { checkUserDataByEmail, updateUserData } from "../../../../redux/reducers/userReducer/userReducer";
import { UserDataType } from "../../../../redux/reducers/userReducer/types";
import { AlertComponentProps } from "../../../shared/alert/alert";
import { ThemeContextType } from "../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../contexts/themeContext/themeContext";
import { SubTitle, Title, Description, BtnInner, Container, Wrapper, InfoBlock } from "./styledChangeUserAccount";

interface ChangeUserAccountProps {
    setAlertActive: (value: null | AlertComponentProps) => void;
}

export const ChangeUserAccount: FC<ChangeUserAccountProps> = ({ setAlertActive }) => {
    const userDataFromRedux: UserDataType | null = useAppSelector((state) => state.user.userData);
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    const dispatch = useAppDispatch();

    const getAllert = (data: AlertComponentProps) => {
        setAlertActive({
            text: data.text,
            type: data.type
        });
        setTimeout(() => setAlertActive(null), 3000);
    }

    const getChangeAccount = async () => {
        try {
            const response = await signInWithGoogle();

            if (response) {
                const email: string | null = response.user.email || '';
                const name: string | null = response.user.displayName || '';
                const isUser = (await dispatch(checkUserDataByEmail({ link: "users/check-email", email: email }))).payload;
                const isUserGoogle = (await dispatch(checkUserDataByEmail({ link: "users/google/check-email", email: email }))).payload;

                if (email && name) {
                    if (isUser || isUserGoogle) {
                        getAllert({ type: "error", text: "User already exists" });
                    } else {
                        if (email === userDataFromRedux!.email) {
                            return;
                        } else {
                            if (!userDataFromRedux) {
                                getAllert({ type: "error", text: "Something went wrong. Please try again later." });
                                return;
                            } else {
                                const changedData = {
                                    ...userDataFromRedux,
                                    email: email
                                };

                                const response = (await dispatch(updateUserData(changedData!))).payload;

                                if (response) {
                                    getAllert({ type: "success", text: "Email updated successfully." });
                                } else {
                                    getAllert({ type: "error", text: "Something went wrong. Please try again later." })
                                }
                            }
                        }
                    }
                } else {
                    getAllert({ type: "error", text: "Something was wrong" });
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container themestyles={themeContext.themeStyles}>
            <Wrapper>
                <Description themestyles={themeContext.themeStyles}>
                    <Title themestyles={themeContext.themeStyles}>
                        <h3>
                            Change Your Account
                        </h3>
                    </Title>
                    <SubTitle themestyles={themeContext.themeStyles}>
                        <h5>
                            Switch to a different account to access personalized settings.
                        </h5>
                    </SubTitle>
                </Description>
                <InfoBlock themestyles={themeContext.themeStyles}>
                    <span>
                        You are about to switch accounts. Make sure this is the action you want to take.
                    </span>
                </InfoBlock>
                <BtnInner>
                    <ButtonComponent
                        disabledValue={false}
                        text="Change google account"
                        color="#fff"
                        type="button"
                        func={getChangeAccount} />
                </BtnInner>
            </Wrapper>
        </Container>
    );
}