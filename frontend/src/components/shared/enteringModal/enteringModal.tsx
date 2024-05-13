
import { FC } from "react";
import { v4 as uuidV4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { BUTTONS_VALUE } from "../../../consts/index";
import { BtnClose } from "../btnClose/btnClose";
import { ButtonComponent } from "../button/button";
import { Container, Wrapper, ButtonsInner, Input, BtnInner, CloseBtnInner, SaveBtnInner, InputInner, DeleteBtnInner } from "./styledEnteringModal";

interface EnteringModalProps {
    closeModal: (value: boolean) => void;
    addTransaction: () => void;
    inputValue: string;
    setInputValue: (value: string | ((prev: string) => string)) => void;
}

export const EnteringModal: FC<EnteringModalProps> = ({
    closeModal, addTransaction, inputValue, setInputValue }) => {
    const sliceNumber = (value: string) => value.slice(0, 12);

    const enterValue = (event: any) => {
        const value = event.currentTarget.textContent;

        if (event.currentTarget.classList.contains("btn_delete")) {
            setInputValue((prev: string) => sliceNumber(prev.slice(0, prev.length - 1)));
        } else if (value === ".") {
            const parts = inputValue.split(/[+\-\/\*]/);
            if (!parts[parts.length - 1].includes(".") && parts[parts.length - 1].length > 0)
                setInputValue((prev) => prev + value);
        } else if (value === "=") {
            inputValue.length > 0 && setInputValue(sliceNumber(eval(inputValue).toString()));
        } else {
            setInputValue((prev) => sliceNumber(prev + value));
        }
    }

    return (
        <Container>
            <Wrapper>
                <CloseBtnInner>
                    <BtnClose func={() => closeModal(false)} color="#fff" />
                </CloseBtnInner>
                <InputInner>
                    <Input value={inputValue} disabled type="text" />
                    <DeleteBtnInner>
                        <button
                            className={"btn_delete"}
                            onClick={enterValue}>
                            <FontAwesomeIcon color="#fff" icon={faDeleteLeft} />
                        </button>
                    </DeleteBtnInner>
                </InputInner>
                <ButtonsInner>
                    {BUTTONS_VALUE.map(value => (
                        <BtnInner key={uuidV4()}>
                            <button
                                className={value === "delete" ? "btn_delete" : ""}
                                onClick={enterValue}>
                                {value === 'delete' ? <FontAwesomeIcon icon={faDeleteLeft} /> : value}
                            </button>
                        </BtnInner>
                    ))}
                </ButtonsInner>
                <SaveBtnInner>
                    <ButtonComponent
                        disabledValue={false}
                        backgroundColor="#5B8A72"
                        BackgroundColorHover="#0f4a34"
                        text="Save"
                        color="#fff"
                        type="button"
                        func={addTransaction} />
                </SaveBtnInner>
            </Wrapper>
        </Container>
    );
};
