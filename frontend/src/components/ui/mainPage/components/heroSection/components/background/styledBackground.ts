import styled from "styled-components";

interface ImageProps {
    windowheight: number;
}

export const Wrapper = styled.div`
    position: absolute;
    z-index: -1;
    width: 100%;
    inset: 0;

    &:before {
        content: "";
        width: 100%;
        background-color: #020202bf;
        position: absolute;
        inset: 0;
    }

    & img {
        width: 100%;
    }
`

export const Image = styled.img<ImageProps>`
    object-fit: cover;
    height: ${({ windowheight }) => `${windowheight - 80}px`};
`