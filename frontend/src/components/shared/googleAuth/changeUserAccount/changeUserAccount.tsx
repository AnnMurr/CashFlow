import { FC } from "react";
import { ButtonComponent } from "../../../shared/button/button";
import { signInWithGooglePopup } from "../../../../utils/firebase/firebase";
import { useAppDispatch, useAppSelector } from "../../../../redux/store/store";
import { checkUserDataByEmail, updateUserData } from "../../../../redux/reducers/userReducer/userReducer";
import { UserDataType } from "../../../../api/authApi/authApiTypes";
import { AlertComponentProps } from "../../../shared/alert/alert";
import { SubTitle, Title, Description } from "./styledChangeUserAccount";

interface ChangeUserAccountProps {
    setAlertActive: (value: null | AlertComponentProps) => void;
}

export const ChangeUserAccount: FC<ChangeUserAccountProps> = ({ setAlertActive }) => {
    const userDataFromRedux: UserDataType | null = useAppSelector((state) => state.user.userData);
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
            const signInWithGoogleResponse = await signInWithGooglePopup();
            const email: string | null = signInWithGoogleResponse.user.email || '';
            const name: string | null = signInWithGoogleResponse.user.displayName || '';
            const isUser = (await dispatch(checkUserDataByEmail({ link: "users/check-email", email: email }))).payload;
            const isUserGoogle = (await dispatch(checkUserDataByEmail({ link: "users/google/check-email", email: email }))).payload;
           
            if (signInWithGoogleResponse && email && name) {
                if (isUser || isUserGoogle) {
                    getAllert({ type: "error", text: "User has already registered" });
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
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Description>
                <Title>
                    <h3>
                        Change Your Account
                    </h3>
                </Title>
                <SubTitle>
                    <h5>
                        Switch to a different account to access personalized settings.
                    </h5>
                </SubTitle>
            </Description>
            <ButtonComponent
                disabledValue={false}
                backgroundColor="#5B8A72"
                BackgroundColorHover="#0f4a34"
                text="Change google account"
                color="#fff"
                type="button"
                func={getChangeAccount} />
        </>
    );
}