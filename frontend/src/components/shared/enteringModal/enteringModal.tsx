import { FC, useEffect } from "react";
import { v4 as uuidV4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { BUTTONS_VALUE, OPERATOR_REGEXP } from "../../../consts/index";
import { BtnClose } from "../btnClose/btnClose";
import { ButtonComponent } from "../button/button";
import { Container, Wrapper, ButtonsInner, Input, BtnInner, CloseBtnInner, SaveBtnInner, InputInner, DeleteBtnInner } from "./styledEnteringModal";
import { getAlert } from "../../../utils/getAlert";
import { AlertComponentProps } from "../alert/alert";
interface EnteringModalProps {
    closeModal: (value: boolean) => void;
    addTransaction: () => void;
    inputValue: string;
    setIsAlertActive: (value: AlertComponentProps | null) => void;
    setInputValue: (value: string | ((prev: string) => string)) => void;
}

export const EnteringModal: FC<EnteringModalProps> = ({
    closeModal, addTransaction, inputValue, setInputValue, setIsAlertActive }) => {
    const sliceNumber = (value: string) => value.slice(0, 10).replace(/[$\s]/g, '');

    const checkForErrors = () => {
        const errorValues = [Infinity, -Infinity, "Error", "NaN"];

        if (errorValues.includes(+inputValue) || errorValues.includes(inputValue)) {
            setInputValue("0");
            return true;
        }
        return false;
    }

    const enterValue = (event: any) => {
        const currentTarget = event.currentTarget as HTMLButtonElement;
        const value = currentTarget.textContent;
        const isError = checkForErrors();

        isError && setInputValue("");

        if (value && inputValue === "0" && value !== "." && !OPERATOR_REGEXP.test(value)) {
            setInputValue("");
        }

        if (value && OPERATOR_REGEXP.test(value)) {
            const lastChar = inputValue.slice(-1);

            !OPERATOR_REGEXP.test(lastChar) && setInputValue((prev) => sliceNumber(prev + value));
        } else if (currentTarget.classList.contains("btn_delete")) {
            if (inputValue.length === 1 || isError) {
                setInputValue("0");
            } else {
                setInputValue((prev) => sliceNumber(prev.slice(0, -1)));
            }
        } else if (value === ".") {
            const parts = inputValue.split(OPERATOR_REGEXP);
            const lastSymbol = parts[parts.length - 1];
            checkForErrors();

            if (!lastSymbol.includes(".") && lastSymbol.length > 0) {
                setInputValue((prev) => prev + value);
            }
        } else if (value === "=") {
            try {
                const result = eval(inputValue);
                setInputValue(sliceNumber(result.toString()));
            } catch (error) {
                getAlert({ text: "Invalid input", type: "error" }, setIsAlertActive, 3000);
            }
        } else {
            setInputValue((prev) => sliceNumber(prev + value));
        }
    }

    useEffect(() => {
        return () => { setInputValue("0") };
    }, []);

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
