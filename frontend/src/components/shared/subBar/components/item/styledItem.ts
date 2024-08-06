import { ThemeStyledProps } from "../../../../../contexts/themeContext/types";
import styled from "styled-components";

interface StyledNavLinkProps {
    isactive: string;
}

type CombinedProps = ThemeStyledProps & StyledNavLinkProps

export const Container = styled.li`
    padding: 5px 0;
`

export const NavLinkStyled = styled.span<CombinedProps>`
    display: flex;
    align-items: center;
    opacity: ${({ isactive }) => (isactive === 'true' ? '0.6' : '1')};

    span {
        padding-left: 10px;
        color:${({ themestyles }) => themestyles.subBarLinkColor};
    }
`