import { FC, useContext } from "react";
import { BtnClose } from "../btnClose/btnClose";
import { ButtonComponent } from "../button/button";
import { ThemeContextType } from "../../../contexts/themeContext/types";
import { ThemeContext } from "../../../contexts/themeContext/themeContext";
import { BtnInner, Title, Wrapper } from "./styledConfirmationModal";

interface ConfirmationModalProps {
    closeModal: (value: boolean) => void;
    handleClick: () => void;
    text: string;
    btnText: string;
}

export const ConfirmationModal: FC<ConfirmationModalProps> = ({ 
    closeModal, handleClick, text, btnText }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    return (
        <Wrapper>
            <BtnClose
                btnInnerstyles={{
                    marginLeft: "auto",
                    paddingBottom: "15px",
                }}
                closeBlock={closeModal}
                size="lg" />
            <Title themestyles={themeContext.themeStyles}>
                <h5>
                    {text}
                </h5>
            </Title>
            <BtnInner>
                <ButtonComponent
                    backgroundColor="#a71616"
                    BackgroundColorHover="#820e0e"
                    text={btnText}
                    color="#fff"
                    type="button"
                    func={handleClick} />
            </BtnInner>
        </Wrapper>
    )
}