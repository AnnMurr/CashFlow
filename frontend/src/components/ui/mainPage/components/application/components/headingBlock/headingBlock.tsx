import { MotionValue, motion } from "framer-motion";
import { FC } from "react";
import { SubTitle, Title } from "./styledHeadingBlock";

interface HeadingBlockProps {
    styles: {
        [key: string]: string | MotionValue<number>;
    }
}

export const HeadingBlock: FC<HeadingBlockProps> = ({ styles }) => {
    return (
        <motion.div style={styles}>
            <Title>
                <h2>
                    Download Cash Flow
                </h2>
            </Title>
            <SubTitle>
                <h3>
                    Manage your asset more conveniently.
                </h3>
            </SubTitle>
        </motion.div>
    )
}