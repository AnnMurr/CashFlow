import { Link as ScrollLink } from 'react-scroll';
import styled from "styled-components";

interface isActiveHeaderProps {
    active_prop: string;
}

export const List = styled.ul`
    display: flex;
`

export const Link = styled(ScrollLink) <isActiveHeaderProps>`
    color: ${({ active_prop }) => active_prop === "true" ? "#000" : "#fff"};
    font-size: 18px;
    padding: 0 20px;
    cursor: pointer;
    font-weight: 600;
`