import { FC, RefObject, useEffect, useState } from "react";
import {
    FEATURES_CALENDAR_ICON,
    FEATURES_ANALYSIS_ICON,
    FEATURES_MULTI_DEVICE_ICON,
    FEATURES_LOCK_ICON
} from "../../../../../../../../../consts/images";
import { ItemBlock } from "./components/itemBlock/itemBlock";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "./styledList";

interface ListProps {
    sectionRef: RefObject<HTMLDivElement>;
}

export const List: FC<ListProps> = ({ sectionRef }) => {
    const { scrollY } = useScroll();
    const [start, setStart] = useState<number>(0);
    const itemPosition = useTransform(scrollY, [start, start + 100], [100, 0]);

    useEffect(() => {
        const sectionTop = sectionRef.current && sectionRef.current.offsetTop / 2;
        sectionTop && setStart(sectionTop);
    }, []);

    return (
        <Container>
            <motion.ul style={{ translateY: itemPosition, transition: "all 0.5s ease" }}>
                <ItemBlock
                    type={"LeftBlock"}
                    link={FEATURES_CALENDAR_ICON}
                    titleText={"Improved Calendar Visuals"}
                    SubTitleText={"Review all your monthly transactions in one place"} />
                <ItemBlock
                    type={"LeftBlock"}
                    link={FEATURES_ANALYSIS_ICON}
                    titleText={"Personalized reports"}
                    SubTitleText={"Detailed analysis of expenses and income"} />
                <ItemBlock
                    type={"LeftBlock"}
                    link={FEATURES_MULTI_DEVICE_ICON}
                    titleText={"Multi-Device Sync"}
                    SubTitleText={"Access data from any device"} />
                <ItemBlock
                    type={"LeftBlock"}
                    link={FEATURES_LOCK_ICON}
                    titleText={"Data Security"}
                    SubTitleText={"Guaranteed protection of financial information"} />
            </motion.ul>
            <motion.ul style={{ translateY: itemPosition, transition: "all 0.5s ease" }}>
                <ItemBlock
                    type={"RightBlock"}
                    link={FEATURES_CALENDAR_ICON}
                    titleText={"Improved Calendar Visuals"}
                    SubTitleText={"Review all your monthly transactions in one place"} />
                <ItemBlock
                    type={"RightBlock"}
                    link={FEATURES_ANALYSIS_ICON}
                    titleText={"Personalized reports"}
                    SubTitleText={"Detailed analysis of expenses and income"} />
                <ItemBlock
                    type={"RightBlock"}
                    link={FEATURES_MULTI_DEVICE_ICON}
                    titleText={"Multi-Device Sync"}
                    SubTitleText={"Access data from any device"} />
                <ItemBlock
                    type={"RightBlock"}
                    link={FEATURES_LOCK_ICON}
                    titleText={"Data Security"}
                    SubTitleText={"Guaranteed protection of financial information"} />
            </motion.ul>
        </Container>
    )
}