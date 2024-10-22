import { ThemeStyledProps } from "../../../contexts/themeContext/types";
import styled from "styled-components";

interface CommonProps {
    isactive: string;
}

export const Container = styled.div<ThemeStyledProps & CommonProps>`
    background-color:${({ themestyles }) => themestyles.subBarBackground};
    position: fixed;
    inset: 0 auto 0 0;
    z-index: 20;

    @media screen and (max-width: 520px) {
        inset:${({ isactive }) => isactive === 'true' ? '0' : '0 0 auto 0'};
    }
`

export const Wrapper = styled.div<CommonProps>`
    padding: 30px;

    @media screen and (max-width: 520px) {
        display:${({ isactive }) => isactive === 'true' ? 'block' : 'flex'};
        align-items: center;
        padding: 15px 30px;
    }
`

export const List = styled.ul<CommonProps>`
    padding-top: 20px;

    @media screen and (max-width: 520px) {
        display: flex;
        display:${({ isactive }) => isactive === 'true' ? 'block' : 'flex'};
        padding:${({ isactive }) => isactive === 'true' ? '60px 0 0 0' : '0 0 0 20px'};
        justify-content: space-around;
        width: 100%;
    }
`
