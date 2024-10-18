import { FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { signInWithGoogle } from "../../../../utils/firebase/firebase";
import { checkUserDataByEmail, setUserData } from "../../../../redux/reducers/userReducer/userReducer";
import { useAppDispatch } from "../../../../redux/store/store";
import { AlertComponentProps } from "../../alert/alert";
import { createUserStore } from "../../../../redux/reducers/userStorageReduser/userStorageReduser";
import { GoogleLinkPrompt } from "../googleLinkPrompt/googleLinkPrompt";
import { SignUpWithGoogleBtn, SignUpWithGoogleBtnInner, SignUpWithGoogleTitle } from "./styledSignUpWithGoogle";
import { showAlert } from "../../../../utils/showAlert";
interface SignUpWithGoogleProps {
    setIsAlertActive: (value: null | AlertComponentProps) => void;
    getLogSuccess: (value: string) => void;
}

export const SignUpWithGoogle: FC<SignUpWithGoogleProps> = ({ setIsAlertActive, getLogSuccess }) => {
    const [isGoogleLinkPrompt, setIsGoogleLinkPrompt] = useState<boolean | string>(false);
    const dispatch = useAppDispatch();

    const logGoogleUser = async () => {
        try {
            const response = await signInWithGoogle();

            if(response) {
                const email: string | null = response.user.email || '';
                const name: string | null = response.user.displayName || '';
    
                if (email && name) {
                    const isUser = (await dispatch(checkUserDataByEmail({ link: "users/check-email", email: email }))).payload;
                    const isUserGoogle = (await dispatch(checkUserDataByEmail({ link: "users/google/check-email", email: email }))).payload;
    
                    if (typeof isUserGoogle === "string") {
                        getLogSuccess(isUserGoogle);
                        return;
                    }
    
                    if (isUser && typeof isUser === "string") {
                        setIsGoogleLinkPrompt(isUser);
                    } else {
                        const token = (await dispatch(setUserData({
                            link: "putdata-google", userData: {
                                email: email,
                                name: name
                            }
                        }))).payload;
    
                        if (typeof token === "string") {
                            const createdStorage = (await dispatch(createUserStore(token))).payload;
    
                            if (createdStorage) getLogSuccess(token);
                        }
                    }
                } else {
                    showAlert({ type: "error", text: "Something was wrong" }, setIsAlertActive, 3000);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <SignUpWithGoogleTitle>
                <span>
                    or <br />
                    Sign up with
                </span>
            </SignUpWithGoogleTitle>
            <SignUpWithGoogleBtnInner>
                <SignUpWithGoogleBtn onClick={logGoogleUser} type="button">
                    <FontAwesomeIcon size="sm" color="#fff" icon={faGoogle} />
                </SignUpWithGoogleBtn>
            </SignUpWithGoogleBtnInner>
            {isGoogleLinkPrompt ?
                <GoogleLinkPrompt
                    getLogSuccess={getLogSuccess}
                    setIsGoogleLinkPrompt={setIsGoogleLinkPrompt}
                    isGoogleLinkPrompt={isGoogleLinkPrompt} />
                : null}
        </>
    )
}

