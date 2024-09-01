import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EMAIL_PATTERN } from "../../../../../../consts/index";
import { AlertComponent, AlertComponentProps } from "../../../../../shared/alert/alert";
import { ButtonComponent } from "../../../../../shared/button/button";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/store/store";
import { checkUserDataByEmail, updateUserData } from "../../../../../../redux/reducers/userReducer/userReducer";
import { UserDataType } from "../../../../../../redux/reducers/userReducer/types";
import { unwrapResult } from "@reduxjs/toolkit";
import { showAlert } from "../../../../../../utils/showAlert";
import { OutlinedInputComponent } from "../../../../../../components/shared/outlinedInput/outlinedInput";
import { BtnInner, Title, Wrapper } from "./styledContent";

export const Content: FC = () => {
    const [emailValue, setEmailValue] = useState<string>("");
    const [isAlertActive, setIsAlertActive] = useState<null | AlertComponentProps>(null);
    const [userData, setUserData] = useState<UserDataType | null>(null);
    const [isError, setIsError] = useState<boolean>(false);
    const userDataFromRedux: UserDataType | null = useAppSelector((state) => state.user.userData);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const changeEmail = async () => {
        const userExists = (await dispatch(checkUserDataByEmail({ link: "/users/google/check-email", email: emailValue }))).payload;
        const isValid = validateEmail(emailValue);

        try {
            if (userData && emailValue && isValid) {
                if (!userExists) {
                    const changedData = {
                        ...userData,
                        email: emailValue
                    };

                    const resultAction = await dispatch(updateUserData(changedData));
                    const response = unwrapResult(resultAction);

                    if (response) {
                        showAlert({ text: response, type: "success" }, setIsAlertActive, 3000);
                        setEmailValue(changedData.email);
                        setTimeout(() => navigate("/settings"), 1000);
                    }
                } else {
                    showAlert({ type: "error", text: "User already exists" }, setIsAlertActive, 3000);
                }
            } else {
                showAlert({ type: "error", text: "E-mail is incorrect" }, setIsAlertActive, 3000);
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

    useEffect(() => {
        userDataFromRedux && setUserData(userDataFromRedux);
        userDataFromRedux && setEmailValue(userDataFromRedux.email);
    }, [userDataFromRedux]);

    return (
        <div>
            <Wrapper>
                <Title>
                    <h5>
                        Enter new email address
                    </h5>
                </Title>
                <div>
                    <OutlinedInputComponent
                        isError={!!isError}
                        value={emailValue}
                        placeholderValue={"Enter your password"}
                        maxLengthNumber={30}
                        type="text"
                        handleChange={(event) => setEmailValue(event.target.value)} />
                </div>
                <BtnInner>
                    <ButtonComponent
                        disabledValue={userData && userData.email === emailValue ? true : false}
                        text="Save"
                        color="#fff"
                        type="button"
                        func={changeEmail} />
                </BtnInner>
                {isAlertActive ?
                    <AlertComponent type={isAlertActive.type} text={isAlertActive.text} />
                    : null}
            </Wrapper>
        </div>
    )
}