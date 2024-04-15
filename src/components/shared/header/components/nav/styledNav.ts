import { NavLink } from "react-router-dom";
import styled from "styled-components";

interface isActiveHeaderProps {
    isActiveHeader: boolean;
}

export const List = styled.ul`
    display: flex;
`

export const Link = styled(NavLink)<isActiveHeaderProps>`
    color: ${({isActiveHeader}) => isActiveHeader ? "#000" : "#fff"};
    font-size: 18px;
    padding: 0 20px;
`