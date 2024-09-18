import { FC, useContext, useEffect, useRef } from "react";
import { v4 as uuidV4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { BUTTONS_VALUE, OPERATOR_REGEX } from "../../../consts/index";
import { BtnClose } from "../btnClose/btnClose";
import { ButtonComponent } from "../button/button";
import { showAlert } from "../../../utils/showAlert";
import { AlertComponentProps } from "../alert/alert";
import { ThemeContextType } from "../../../contexts/themeContext/types";
import { ThemeContext } from "../../../contexts/themeContext/themeContext";
import { Container, Wrapper, ButtonsInner, Input, BtnInner, SaveBtnInner, InputInner, DeleteBtnInner } from "./styledEnteringModal";

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
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    const inputRef = useRef<HTMLInputElement>(null);

    const checkForErrors = () => {
        const errorValues = [Infinity, -Infinity, "Error", "NaN"];

        if (errorValues.includes(+inputValue) || errorValues.includes(inputValue)) {
            return true;
        }
        return false;
    }

    const enterValue = (event: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) => {
        inputRef.current && inputRef.current.focus()
        const keyboardEvent = event.type === 'keydown' ? event as React.KeyboardEvent<HTMLInputElement> : null;
        const currentTarget = event.currentTarget as HTMLButtonElement;
        const keyValue = keyboardEvent && BUTTONS_VALUE.includes(keyboardEvent.key) ? keyboardEvent.key : null;
        const value = keyValue || currentTarget.textContent;
        const isDeleteButton = currentTarget.classList.contains("btn_delete");
        const isError = checkForErrors();

        if (keyboardEvent && keyboardEvent.key === "Enter") {
            addTransaction();
            return;
        }

        if (!value && !isDeleteButton) return;
        isError && setInputValue("");

        if (value && inputValue === "0" && value !== "." && !OPERATOR_REGEX.test(value)) {
            setInputValue("");
        }

        if (value && OPERATOR_REGEX.test(value)) {
            const lastChar = inputValue.slice(-1);

            !OPERATOR_REGEX.test(lastChar) && setInputValue((prev) => sliceNumber(prev + value));
        } else if (isDeleteButton || value === "Backspace") {
            setInputValue(inputValue.length === 1 || isError ? "0" : (prev) => sliceNumber(prev.slice(0, -1)));
        } else if (value === ".") {
            const parts = inputValue.split(OPERATOR_REGEX);
            const lastSymbol = parts[parts.length - 1];
            checkForErrors();

            if (!lastSymbol.includes(".") && lastSymbol.length > 0) {
                setInputValue((prev) => prev + value);
            }
        } else if (value === "=") {
            try {
                const result = eval(inputValue).toString();
                setInputValue(sliceNumber(result));
            } catch (error) {
                showAlert({ text: "Invalid input", type: "error" }, setIsAlertActive, 3000);
            }
        } else {
            setInputValue((prev) => sliceNumber(prev + value));
        }
    }

    useEffect(() => {
        inputRef?.current && inputRef.current.focus();

        return () => { setInputValue("0") };
    }, []);

    return (
        <Container themestyles={themeContext.themeStyles}>
            <Wrapper>
                <BtnClose
                    btnInnerstyles={{
                        marginLeft: "auto",
                        marginBottom: "10px"
                    }}
                    closeBlock={closeModal}
                    size="lg"
                    color={themeContext.themeStyles.enteringModalBtnColor} />
                <InputInner>
                    <Input
                        themestyles={themeContext.themeStyles}
                        ref={inputRef}
                        onKeyDown={enterValue}
                        value={inputValue}
                        readOnly
                        type="text" />
                    <DeleteBtnInner>
                        <button
                            className={"btn_delete"}
                            onClick={enterValue}>
                            <FontAwesomeIcon color={themeContext.themeStyles.enteringModalBtnColor} icon={faDeleteLeft} />
                        </button>
                    </DeleteBtnInner>
                </InputInner>
                <ButtonsInner>
                    {BUTTONS_VALUE.slice(0, -2).map(value => (
                        <BtnInner themestyles={themeContext.themeStyles} key={uuidV4()}>
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
                        text="Save"
                        color="#fff"
                        type="button"
                        func={addTransaction} />
                </SaveBtnInner>
            </Wrapper>
        </Container>
    );
};
