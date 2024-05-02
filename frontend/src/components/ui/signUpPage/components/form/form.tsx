import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { OutlinedInput } from "@mui/material";
import { ErrorMessage } from "../../../../shared/errorMessage/errorMessage";
import { AlertComponentProps } from "../../../../shared/alert/alert";
import { ButtonComponent } from "../../../../shared/button/button";
import { EMAIL_PATTERN, PASSWORD_PATTERN } from "../../../../../consts/index";
import { setUserData, checkUserDataByEmail } from "../../../../../api/authApi/authApi";
import { UserDataType } from "../../../../../api/authApi/authApiTypes";
import { createUserStore } from "../../../../../api/userDataApi/userDataApi";
import { setDataToLocalStorage } from "../../../../../storage/localStorage/localStorage";
import { AuthorizedContext } from "../../../../../contexts/authorizedContext/authorizedContext";
import { ErrorMessageContainer, FormContainer, Title } from "./styledForm";

interface FormProps {
    setIsAlertActive: (value: null | AlertComponentProps) => void;
}

export const Form: FC<FormProps> = ({ setIsAlertActive }) => {
    const navigate = useNavigate();
    const { login } = useContext(AuthorizedContext)

    const onSubmit: SubmitHandler<UserDataType> = async (data) => {
        try {
            const isUser = await checkUserDataByEmail(data);

            if (isUser) {
                setIsAlertActive({ type: "error", text: "User has already registered." });
                setTimeout(() => setIsAlertActive(null), 2000);
            } else {
                delete data.repeatPassword;
                const token = await setUserData(data);
                const createdStorage = await createUserStore(token);

                if (!createdStorage.ok) {
                    console.error("Failed to create storage");
                }

                setIsAlertActive({ type: "success", text: "User account creation successful" });
                setTimeout(() => {
                    setIsAlertActive(null);
                    navigate('/profile');
                    setDataToLocalStorage("token", token);
                    login();
                }, 1000);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const {
        register,
        formState: { errors },
        handleSubmit,
        getValues,
    } = useForm<UserDataType>({
        mode: "onChange",
    });

    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)} action="/submit" method="post">
            <Title>
                <h2>
                    Sign Up
                </h2>
            </Title>
            <OutlinedInput
                {...register("name", {
                    required: true,
                    minLength: {
                        value: 2,
                        message: "Minimum length is 2 characters.",
                    },
                    maxLength: {
                        value: 20,
                        message: "Maximum length is 20 characters.",
                    },
                })}
                error={!!errors.name}
                sx={{
                    marginBottom: "20px",
                    width: "100%",
                    fontSize: "14px",
                    // "& .MuiOutlinedInput-input": {
                    //     color: "#0f4a34 !important" 
                    // },
                    // "& .MuiOutlinedInput-notchedOutline": {
                    //     borderColor: "#0f4a34 !important"
                    // }
                }}
                size="small" placeholder="Name" />
            {!!errors.name ?
                <ErrorMessageContainer>
                    <ErrorMessage text={errors.name?.message as string} />
                </ErrorMessageContainer>
                : null}
            <OutlinedInput
                {...register("email", {
                    required: true,
                    pattern: {
                        value: EMAIL_PATTERN,
                        message: "Incorrectly entered e-mail",
                    },
                    maxLength: {
                        value: 40,
                        message: "Maximum length is 30 characters.",
                    },
                })}
                error={!!errors.email}
                sx={{
                    marginBottom: "20px",
                    width: "100%",
                    fontSize: "14px"
                }}
                size="small" placeholder="Email" />
            <ErrorMessageContainer>
                <ErrorMessage text={errors.email?.message as string} />
            </ErrorMessageContainer>
            <OutlinedInput
                {...register("password", {
                    required: true,
                    pattern: {
                        value:
                            PASSWORD_PATTERN,
                        message:
                            "Password must contain at least one digit, one special character '!@#$%^&*', one lowercase letter, one uppercase letter, and should not contain any spaces.",
                    },
                    minLength: {
                        value: 6,
                        message: "Minimum length is 6 characters.",
                    },
                    maxLength: {
                        value: 30,
                        message: "Maximum length is 30 characters.",
                    },
                })}
                error={!!errors.password}
                sx={{
                    marginBottom: "20px",
                    width: "100%",
                    fontSize: "14px"
                }}
                size="small" placeholder="Password" />
            <ErrorMessageContainer>
                <ErrorMessage text={errors.password?.message as string} />
            </ErrorMessageContainer>
            <OutlinedInput
                {...register("repeatPassword", {
                    required: true,
                    validate: (value) =>
                        value === getValues("password") || "Passwords must match",
                })}
                error={!!errors.repeatPassword}
                sx={{
                    marginBottom: "20px",
                    width: "100%",
                    fontSize: "14px"
                }}
                size="small" placeholder="Repeat password" />
            <ErrorMessageContainer>
                <ErrorMessage text={errors.repeatPassword?.message as string} />
            </ErrorMessageContainer>
            <ButtonComponent
                backgroundColor="#5B8A72"
                BackgroundColorHover="#0f4a34"
                text="Sign up"
                color="#fff"
                type="submit" />
        </FormContainer>
    )
}