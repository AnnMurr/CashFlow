import styled from "styled-components";

interface StylesProps {
    isfiltered: string;
}

export const Wrapper = styled.div<StylesProps>`
    padding: 20px 40px 20px 40px;
    align-items: center;
    display: grid;
    text-align: end;
    grid-template-columns: ${({ isfiltered }) => isfiltered === "true" ? "repeat(2, 1fr)" : "repeat(3, 1fr)"};
`