import { FC } from "react";
import { PhoneImage } from "./components/phoneImage/phoneImage";
import { AppStoresBlock } from "./components/appStoresBlock/appStoresBlock";
import { Container, Section, Title, SubTitle, Wrapper, TitleWrap } from "./styledApplication";

export const Application: FC = () => {
    return (
        <Section>
            <Container>
                <Wrapper>
                    <div>
                        <TitleWrap>
                            <Title>
                                Download Cash Flow
                            </Title>
                        </TitleWrap>
                        <div>
                            <SubTitle>
                                Download Cash Flow
                            </SubTitle>
                        </div>
                       <AppStoresBlock />
                    </div>
                    <PhoneImage />
                </Wrapper>
            </Container>
        </Section>
    )
}