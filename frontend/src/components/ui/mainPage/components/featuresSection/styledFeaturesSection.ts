import { motion } from "framer-motion";
import styled from "styled-components";

export const Section = styled.section`
    background-color: #F8F8F8;
`

export const Container = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 15px;
`

export const Wrapper = styled.div`
    padding: 120px 0;
    text-align: center;

    @media screen and (max-width: 480px) {
        padding: 60px 0;
    }
`

export const TitleInner = styled(motion.div)`
    padding-bottom: 20px;
`

export const Title = styled.h2`
    color: #000;
    font-size: 40px;

    @media screen and (max-width: 480px) {
        font-size: 25px;
    }
`

export const SubTitle = styled.h3`
   font-weight: 200;
   font-size: 30px;

    @media screen and (max-width: 480px) {
            font-size: 22px;
    }
`