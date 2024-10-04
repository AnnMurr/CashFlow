import styled from "styled-components";

export const Container = styled.div`
    position: relative;
`

export const ImageInner = styled.div`
    width: fit-content;
    margin: 0 auto;

    @media screen and (max-width: 1110px) {
        visibility: hidden;
    }

    @media screen and (max-width: 780px) {
        display: none;
    }
`