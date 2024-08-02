import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonComponent } from "../../../../shared/button/button";
import { BtnInner, Container, SubTitle, Title, Wrapper } from "./styledGoToRequest";

export const GoToRequest: FC = () => {
    const navigate = useNavigate();

    return (
        <section>
            <Container>
                <Wrapper>
                    <Title>
                        <h4>
                            Can't find what you're looking for?
                        </h4>
                    </Title>
                    <SubTitle>
                        <h5>
                            Let us help you!
                        </h5>
                    </SubTitle>
                    <BtnInner>
                        <ButtonComponent
                            backgroundColor="#171717"
                            BackgroundColorHover="transparent"
                            borberColorHover="#171717"
                            disabledValue={false}
                            text="Submit a request"
                            color="#fff"
                            type="button"
                            func={() => navigate("/contacts-us")} />
                    </BtnInner>
                </Wrapper>
            </Container>
        </section>
    )
}