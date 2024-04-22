import { motion } from "framer-motion";
import styled from "styled-components";

export const ImageInner = styled(motion.div)`
    max-width: 300px;
    position: relative;
`

export const IconInner = styled.div`
    width: fit-content;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -25px;
`
