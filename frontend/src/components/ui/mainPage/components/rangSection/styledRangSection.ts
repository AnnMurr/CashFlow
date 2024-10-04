import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 15px;
`

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 50px 0;

    @media screen and (max-width: 820px) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 30px 20px;
    }
`

export const Item = styled(motion.div)`
    transition: all 0.5s ease;
    display: flex;
    justify-content: center;
`