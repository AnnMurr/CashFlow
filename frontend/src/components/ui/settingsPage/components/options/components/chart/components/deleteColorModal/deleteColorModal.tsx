import { FC, useContext } from "react";
import { ThemeContext } from "../../../../../../../../../contexts/themeContext/themeContext";
import { ThemeContextType } from "../../../../../../../../../contexts/themeContext/types";
import { BtnClose } from "../../../../../../../../shared/btnClose/btnClose";
import { ButtonComponent } from "../../../../../../../../shared/button/button";
import { BtnInner, Container, Title, Wrapper } from "./styledDeleteColorModal";

export const DeleteColorModal:FC<any> = ({ closeModal, handleDeleteColor }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    return (
        <Container themestyles={themeContext.themeStyles}>
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
                    Are you sure you want to delete this color?
                </h5>
            </Title>
            <BtnInner>
                <ButtonComponent
                    backgroundColor="#a71616"
                    BackgroundColorHover="#820e0e"
                    text="Delete"
                    color="#fff"
                    type="button"
                    func={handleDeleteColor} />
            </BtnInner>
        </Wrapper>
    </Container>
    )
}