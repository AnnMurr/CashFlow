import { ThemeStyledProps } from "../../../../../contexts/themeContext/types";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

interface StyledNavLinkProps {
    isActive: boolean;
}

type CombinedProps = ThemeStyledProps & StyledNavLinkProps

export const Container = styled.li`
    padding: 5px 0;
`

export const NavLinkStyled = styled(NavLink)<CombinedProps>`
    display: flex;
    align-items: center;
    opacity: ${({ isActive }) => (isActive ? '0.6' : '1')};

    span {
        padding-left: 10px;
        color:${({ themestyles }) => themestyles.subBarLinkColor};
    }
`