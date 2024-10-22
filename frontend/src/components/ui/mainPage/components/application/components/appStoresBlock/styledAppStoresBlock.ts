import { motion } from "framer-motion";
import styled from "styled-components";

export const AppIconsWrap = styled(motion.div)`
    display: flex;
    justify-content: space-between;
    padding: 40px 0;
    gap: 15px;

    a{
        transition: all 0.5s ease-in-out;

        &:hover {
            transform: scale(1.1, 1.1);

            @media screen and (max-width: 1024px) {
                transform: scale(1, 1);
            }
        }

        @media screen and (max-width: 870px) {
            margin: 0;
        }
    }
`

export const Image = styled.img`
    height: 60px;
    width: 206px;

    @media screen and (max-width: 580px) {
        width: 170px;     
    }
`
