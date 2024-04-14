import { FC } from "react";

import { MAIN_PHONE_AFTER, MAIN_PHONE_AVERAGE, MAIN_PHONE_BEFORE } from "../../../../../consts/images";
import {  Container, PhonesWrap, Wrapper, Section } from "./styledHeroSection";
import { PhoneImage } from "./components/phoneImage/phoneImage";
import { Background } from "./components/background/background";
import { RepresentingBlock } from "./components/representingBlock/representingBlock";

export const HeroSection: FC = () => {
    const windowHeight = window.innerHeight

    return (
        <Section style={{ height: `${windowHeight - 90}px` }}>
            <Container>
                <Wrapper>
                    <Background windowHeight={windowHeight} />
                    <RepresentingBlock />
                    <PhonesWrap>
                        <PhoneImage link={MAIN_PHONE_AFTER} altText={"phone"} />
                        <PhoneImage link={MAIN_PHONE_AVERAGE} altText={"phone"} />
                        <PhoneImage link={MAIN_PHONE_BEFORE} altText={"phone"} />
                    </PhonesWrap>
                </Wrapper>
            </Container>
        </Section>
    )
}