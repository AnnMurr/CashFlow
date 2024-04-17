import { FC, useState } from "react";
import { EMAIL_PATTERN } from "../../../../../../../consts/index";
import { FormWrap, Label, Input, Textarea, Btn } from "./styledForm";

interface FormProps {
    setIsModalActive: (isActive: boolean) => void;
}

export const Form: FC<FormProps> = ({ setIsModalActive }) => {
    const [emailValue, setEmailValue] = useState<string>("");
    const [subjectValue, setSubjectValue] = useState<string>("");
    const [descriptiontValue, setDescriptionValue] = useState<string>("");
    const [emailError, setEmailError] = useState<boolean>(false);
    const [subjectError, setSubjectError] = useState<boolean>(false);
    const [descriptionError, setDescriptionError] = useState<boolean>(false);

    const setValue = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const className = event.target.className;
        const value = event.target.value;

        if (className.includes("email")) {
            setEmailValue(value);
        } else if (className.includes("subject")) {
            setSubjectValue(value);
        } else if (className.includes("description")) {
            setDescriptionValue(value);
        }
    }

    const submitForm = (event: any) => {
        event.preventDefault();
        resetErrors();

        if (subjectValue.length === 0) {
            setSubjectError(true);
        } else if (descriptiontValue.length === 0) {
            setDescriptionError(true);
        } else if (EMAIL_PATTERN.test(emailValue)) {
            sendForm();
        } else {
            setEmailError(true);
        }
    }

    const sendForm = () => {
        setIsModalActive(true);
        resetForm();
        setTimeout(() => setIsModalActive(false), 2000);
    }

    const resetErrors = () => {
        setEmailError(false);
        setSubjectError(false);
        setDescriptionError(false);
    }

    const resetForm = () => {
        setEmailValue("");
        setSubjectValue("");
        setDescriptionValue("");
    }

    return (
        <FormWrap>
            <Label>
                Your email address
            </Label>
            <Input
                error={emailError}
                className="email"
                onChange={setValue}
                value={emailValue} type="email" />
            <Label>
                Subject
            </Label>
            <Input
                error={subjectError}
                maxLength={100}
                className="subject"
                onChange={setValue}
                value={subjectValue}
                type="text" />
            <Label>
                Description
            </Label>
            <Textarea
                error={descriptionError}
                className="description"
                onChange={setValue}
                value={descriptiontValue}
                rows={5}>
            </Textarea>
            <div>
                <Btn onClick={submitForm} type="submit">
                    Submit
                </Btn>
            </div>
        </FormWrap>
    )
}