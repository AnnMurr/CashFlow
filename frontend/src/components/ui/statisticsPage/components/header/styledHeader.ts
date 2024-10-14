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

    @media screen and (max-width: 860px) {
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: auto auto;
    }

    @media screen and (max-width: 580px) {
      padding: 20px 15px 20px 15px;
    }
`