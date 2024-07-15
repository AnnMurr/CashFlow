import styled from "styled-components";
interface ContainerProps {
    type?: string;
}

export const Container = styled.div<ContainerProps>`
    background-color: #030303b3;
    position: fixed;
    z-index: 21;
    inset: 0;
    cursor: ${({type}) => type === "clickable" ? "pointer" : ""};
`