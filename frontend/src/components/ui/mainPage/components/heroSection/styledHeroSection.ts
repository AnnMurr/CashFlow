import { motion } from "framer-motion";
import styled from "styled-components";

export const Section = styled.section`
    position: relative;
    overflow: hidden;
`
export const Container = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 15px;
`

export const Wrapper = styled.div`
    display: flex;
    padding-top: 260px;

    @media screen and (max-width: 680px) {
        padding-top: 160px;
    }
`

export const PhonesWrap = styled(motion.div)`
    display: flex;
    position: absolute; 
    bottom: 0; 
    align-items: end; 
    right: 10%; 
    max-width: 50%;

    @media screen and (max-width: 1024px) {
        max-width: 100%;
        left: 50%;
        right: auto; 
        transform: translate(-50%, 0) !important;
    }
`