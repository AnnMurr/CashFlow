import styled from "styled-components";

interface StylesProps {
    isfiltered: string;
}

export const TotalSumInner = styled.div<StylesProps>`
    text-align: start;
    display: flex;
    margin-left: ${({ isfiltered }) => isfiltered === "true" ? "auto" : "0"};
`

export const TotalSumTitle = styled.div`
    padding-right: 10px;

    h5 {
        font-weight: 700;
        font-size: 16px;
    }
`

export const Sum = styled.div`
    span {
        font-weight: 500;
        font-size: 16px;
    }
`