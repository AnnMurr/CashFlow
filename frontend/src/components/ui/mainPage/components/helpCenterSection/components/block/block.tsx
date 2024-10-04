import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonComponent } from "../../../../../../shared/button/button";
import { SubTitle, Title, BtnInner, Container } from "./styledBlock";

export const Block: FC = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <Title>
                <h4>
                    Money Manager Help Center
                </h4>
            </Title>
            <SubTitle>
                <h5>
                    You can find out regular update
                    and user manuals.
                </h5>
            </SubTitle>
            <BtnInner>
                <ButtonComponent
                    backgroundColor="#171717"
                    BackgroundColorHover="transparent"
                    borberColorHover="#171717"
                    disabledValue={false}
                    text="Help Center"
                    color="#fff"
                    type="button"
                    func={() => navigate("help-center")} />
            </BtnInner>
        </Container>
    )
}