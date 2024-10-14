import { ThemeStyledProps } from "../../../../../contexts/themeContext/types";
import styled from "styled-components";

interface StyledNavLinkProps {
    isactive: string;
}

interface ContainerProps {
    isactive: string;
}

type CombinedProps = ThemeStyledProps & StyledNavLinkProps

export const Container = styled.li<ContainerProps>`
    padding: 5px 0;

    @media screen and (max-width: 520px) {
        padding: ${({ isactive }) => (isactive === 'true' ? '10px 0' : '0 5px')};
    }
`

export const NavLinkStyled = styled.span<CombinedProps>`
    display: flex;
    align-items: center;
    opacity: ${({ isactive }) => (isactive === 'true' ? '0.6' : '1')};

    span {
        padding-left: 10px;
        color:${({ themestyles }) => themestyles.subBarLinkColor};

        @media screen and (max-width: 520px) {
            padding-left: 0;
        }
    }

    @media screen and (max-width: 520px) {
        flex-direction: column;
    }
`