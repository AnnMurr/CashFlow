import styled from "styled-components";

export const Wrapper = styled.div`
    position: absolute;
    z-index: -1;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;

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