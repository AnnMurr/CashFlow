import { FC, useEffect, useRef, useState } from "react";
import { RANG_ITEM_1, RANG_ITEM_2, RANG_ITEM_3, RANG_ITEM_4 } from "../../../../../consts/images";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container, Item, Wrapper } from "./styledRangSection";
import { v4 as uuidv4 } from 'uuid';

export const RangSection: FC = () => {
    const items = [RANG_ITEM_1, RANG_ITEM_2, RANG_ITEM_3, RANG_ITEM_4];
    const { scrollY } = useScroll();
    const sectionRef = useRef<HTMLDivElement>(null);
    const [start, setStart] = useState<number>(0);
    const itemPosition = useTransform(scrollY, [start, start + 100], [60, 0]);

    useEffect(() => {
        const sectionTop = sectionRef.current && sectionRef.current.offsetTop / 4;
        sectionTop && setStart(sectionTop);
    }, []);

    return (
        <section ref={sectionRef}>
            <Container>
                <Wrapper>
                    {items.map(item => (
                        <Item
                            style={{ translateY: itemPosition }}
                            key={uuidv4()} >
                            <img src={item} alt="rang" />
                        </Item>
                    ))}
                </Wrapper>
            </Container>
        </section>
    )
}