import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { SignUpWithGoogleBtn, SignUpWithGoogleBtnInner, SignUpWithGoogleTitle } from "./styledSignUpWithGoogle";

export const SignUpWithGoogle: FC = () => {
    return (
        <>
            <SignUpWithGoogleTitle>
                <span>
                    or <br />
                    Sign up with
                </span>
            </SignUpWithGoogleTitle>
            <SignUpWithGoogleBtnInner>
                <SignUpWithGoogleBtn type="button">
                    <FontAwesomeIcon size="sm" color="#fff" icon={faGoogle} />
                </SignUpWithGoogleBtn>
            </SignUpWithGoogleBtnInner>
        </>
    )
}