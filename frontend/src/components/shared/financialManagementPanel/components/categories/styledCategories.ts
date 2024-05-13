import styled from "styled-components";

export const List = styled.ul`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    row-gap: 20px;
    min-height: fit-content;
`

export const Item = styled.li`
    max-width: 90px;
    position: relative;
    cursor: pointer;
`
