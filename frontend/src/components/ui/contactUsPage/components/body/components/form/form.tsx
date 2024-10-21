import { FC, useState } from "react";
import { EMAIL_PATTERN } from "../../../../../../../consts/index";
import { ButtonComponent } from "../../../../../../../components/shared/button/button";
import { FormWrap, Label, Input, Textarea, BtnInner } from "./styledForm";

interface FormProps {
    setIsModalActive: (isActive: boolean) => void;
}

export const Form: FC<FormProps> = ({ setIsModalActive }) => {
    const [emailValue, setEmailValue] = useState<string>("");
    const [subjectValue, setSubjectValue] = useState<string>("");
    const [descriptionValue, setDescriptionValue] = useState<string>("");
    const [emailError, setEmailError] = useState<boolean>(false);
    const [subjectError, setSubjectError] = useState<boolean>(false);
    const [descriptionError, setDescriptionError] = useState<boolean>(false);

    const setValue = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;

        if (name === "email") {
            setEmailValue(value);
        } else if (name === "subject") {
            setSubjectValue(value);
        } else if (name === "description") {
            setDescriptionValue(value);
        }
    }

    const submitForm = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        resetErrors();

        if (subjectValue.length === 0) {
            setSubjectError(true);
        } else if (descriptionValue.length === 0) {
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
                name="email"
                onChange={setValue}
                value={emailValue}
                type="email" />
            <Label>
                Subject
            </Label>
            <Input
                error={subjectError}
                maxLength={100}
                name="subject"
                onChange={setValue}
                value={subjectValue}
                type="text" />
            <Label>
                Description
            </Label>
            <Textarea
                error={descriptionError}
                name="description"
                onChange={setValue}
                value={descriptionValue}
                rows={5}>
            </Textarea>
            <BtnInner>
                <ButtonComponent
                    backgroundColor="#171717"
                    BackgroundColorHover="transparent"
                    borberColorHover="#171717"
                    disabledValue={false}
                    text="Submit"
                    color="#fff"
                    type="submit"
                    func={submitForm} />
            </BtnInner>
        </FormWrap>
    )
}