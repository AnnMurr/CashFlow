import styled from "styled-components";

export const Container = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 15px;
`

export const Wrapper = styled.div`
    padding: 90px 0;
`

export const Heading = styled.div`
    padding-bottom: 20px;

    & h2 {
        font-size: 30px;
    }
`

export const Link = styled.a`
    color: #000;
    border-bottom: 1px solid transparent;
    transition: all 0.5s ease;

    &:hover {
        border-bottom: 1px solid #000;
    }
`