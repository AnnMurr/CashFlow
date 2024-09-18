import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import { checkEmailValidity } from "../../../../../../../../utils/checkEmailValidity";
import { showAlert } from "../../../../../../../../utils/showAlert";
import { ButtonComponent } from "../../../../../../../shared/button/button";
import { AlertComponentProps } from "../../../../../../../shared/alert/alert";
import { useAppDispatch, useAppSelector } from "../../../../../../../../redux/store/store";
import { checkUserDataByEmail, updateUserData } from "../../../../../../../../redux/reducers/userReducer/userReducer";
import { UserDataType } from "../../../../../../../../redux/reducers/userReducer/types";
import { Container } from "./styledButton";

interface SubmitButtonProps {
    emailValue: string;
    setEmailValue: (value: string) => void;
    setIsAlertActive: (value: AlertComponentProps | null) => void;
    setIsError: (value: boolean) => void;
}

export const SubmitButton: FC<SubmitButtonProps> = ({
    emailValue, setEmailValue, setIsAlertActive, setIsError }) => {
    const [userData, setUserData] = useState<UserDataType | null>(null);
    const userDataFromRedux: UserDataType | null = useAppSelector((state) => state.user.userData);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        userDataFromRedux && setUserData(userDataFromRedux);
        userDataFromRedux && setEmailValue(userDataFromRedux.email);
    }, [userDataFromRedux]);

    const changeEmail = async () => {
        const userExists = (await dispatch(checkUserDataByEmail({ link: "/users/google/check-email", email: emailValue }))).payload;
        const isValid = checkEmailValidity(emailValue, setIsError);

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

    return (
        <Container>
            <ButtonComponent
                disabledValue={userData && userData.email === emailValue ? true : false}
                text="Save"
                color="#fff"
                type="submit"
                func={changeEmail} />
        </Container>
    )
}