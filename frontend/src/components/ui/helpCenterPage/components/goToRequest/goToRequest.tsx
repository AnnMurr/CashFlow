import { FC } from "react";
import { Btn, BtnInner, Container, SubTitle, Title, Wrapper } from "./styledGoToRequest";

export const GoToRequest: FC = () => {
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
                        <Btn to={"/contacts-us"}>
                            Submit a request
                        </Btn>
                    </BtnInner>
                </Wrapper>
            </Container>
        </section>
    )
}