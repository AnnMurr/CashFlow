import styled from "styled-components";

export const Wrapper = styled.div`
    padding-top: 60px;
`

export const GridInner = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px 40px;
    padding-top: 100px;

    @media screen and (max-width: 880px) {
        grid-template-columns: repeat(1, 1fr);
    }
`