import styled from "styled-components";

export const Container = styled.div`
    position: fixed;
    top: 5px;
    right: 5px;
    z-index: 999;
    min-width: 18rem;
    width: fit-content;
    max-width: 20rem;
    transition: transform 0.3s ease, opacity 0.3s ease;

    @media screen and (max-width: 420px) {
        inset: 0 0 auto 0;
        max-width: 100%;
        width: 100%;
    }
`