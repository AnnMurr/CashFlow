import { FC } from "react";
import { MAIN_PHONE_AFTER, MAIN_PHONE_AVERAGE, MAIN_PHONE_BEFORE } from "../../../../../consts/images";
import { motion } from "framer-motion";
import { Background, PhoneImage, RepresentingBlock } from ".";
import { Container, PhonesWrap, Wrapper, Section } from "./styledHeroSection";

export const HeroSection: FC = () => {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    return (
        <Section
            style={{
                height: windowWidth <= 580 ?
                    `${windowHeight - 58}px` :
                    `${windowHeight - 80}px`
            }}>
            <Container>
                <Wrapper>
                    <Background windowHeight={windowHeight} />
                    <motion.div
                        initial={{ y: 150 }}
                        animate={{ y: 0 }}
                        transition={{ stiffness: 100 }} >
                        <RepresentingBlock />
                    </motion.div>
                    <PhonesWrap
                        initial={{ y: 150 }}
                        animate={{ y: 0 }}
                        transition={{ type: "spring", stiffness: 100 }} >
                        <PhoneImage link={MAIN_PHONE_AFTER} altText={"phone"} />
                        <PhoneImage link={MAIN_PHONE_AVERAGE} altText={"phone"} />
                        <PhoneImage link={MAIN_PHONE_BEFORE} altText={"phone"} />
                    </PhonesWrap>
                </Wrapper>
            </Container>
        </Section>
    )
}