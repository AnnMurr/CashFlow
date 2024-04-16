import { FC, useEffect, useRef, useState } from "react";
import { FeaturesList } from "./components/featuresList/featuresList";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container, Title, Wrapper, TitleInner, SubTitle, Section } from "./styledFeaturesSection";

export const FeaturesSection: FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [start, setStart] = useState<number>(0);
    const { scrollY } = useScroll();
    const itemTranslate = useTransform(scrollY, [start, start + 100], [60, 0]);

    useEffect(() => {
        const sectionTop = sectionRef.current && sectionRef.current.offsetTop / 3;
        sectionTop && setStart(sectionTop);
    }, []);

    return (
        <Section ref={sectionRef}>
            <Container>
                <Wrapper>
                    <TitleInner style={{ translateY: itemTranslate, transition: "all 0.5s ease" }}>
                        <Title>Features</Title>
                    </TitleInner>
                    <motion.div style={{ translateY: itemTranslate, transition: "all 0.5s ease" }}>
                        <SubTitle>
                            Cash Flow has easy and various features.
                        </SubTitle>
                    </motion.div>
                    <FeaturesList sectionRef={sectionRef} />
                </Wrapper>
            </Container>
        </Section>
    )
}