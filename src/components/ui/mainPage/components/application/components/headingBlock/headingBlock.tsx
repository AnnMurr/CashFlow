import { MotionValue, motion } from "framer-motion";
import { FC } from "react";
import { SubTitle, Title, TitleWrap } from "./styledHeadingBlock";

interface HeadingBlockProps {
    styles: {
        [key: string]: string | MotionValue<number>;
    }
}

export const HeadingBlock: FC<HeadingBlockProps> = ({ styles }) => {
    return (
        <motion.div style={styles}>
            <TitleWrap>
                <Title>
                    Download Cash Flow
                </Title>
            </TitleWrap>
            <div>
                <SubTitle>
                    Manage your asset more conveniently.
                </SubTitle>
            </div>
        </motion.div>
    )
}