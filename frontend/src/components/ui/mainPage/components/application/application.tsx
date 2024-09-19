import { FC, useEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import { AppStoresBlock, HeadingBlock, PhoneImage } from ".";
import { Container, Section, Wrapper } from "./styledApplication";

export const Application: FC = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const [start, setStart] = useState<number>(0);
    const { scrollY } = useScroll();

    const itemTranslate = useTransform(scrollY, [start, start + 100], [100, 0]);
    const linksTranslate = useTransform(scrollY, [start + 150, start + 250], [100, 0]);

    useEffect(() => {
        const result = sectionRef.current && sectionRef.current.offsetTop / 2 + 200;
        result && setStart(result);
    }, []);

    return (
        <Section id="section_app" ref={sectionRef}>
            <Container>
                <Wrapper>
                    <div>
                        <HeadingBlock styles={{
                            translateY: itemTranslate,
                            transition: "all 0.5s ease"
                        }} />
                        <AppStoresBlock styles={{
                            translateY: linksTranslate,
                            transition: "all 0.5s ease"
                        }} />
                    </div >
                    <PhoneImage styles={{
                        translateY: itemTranslate,
                        transition: "all 0.5s ease"
                    }} />
                </Wrapper>
            </Container>
        </Section>
    )
}