import { FC } from "react";
import { FeaturesList } from "./components/featuresList/featuresList";
import { Container, Title, Wrapper, TitleInner, SubTitle, Section } from "./styledFeaturesSection";

export const FeaturesSection: FC = () => {
    return (
        <Section>
            <Container>
                <Wrapper>
                    <TitleInner>
                        <Title>Features</Title>
                    </TitleInner>
                    <div>
                        <SubTitle>
                            Cash Flow has easy and various features.
                        </SubTitle>
                    </div>
                    <FeaturesList />
                </Wrapper>
            </Container>
        </Section>
    )
}