import { Link as ScrollLink } from 'react-scroll';
import styled from "styled-components";

interface ContainerProps {
    background: string;
}

interface LinkProps {
    color: string;
}

export const Container = styled.div<ContainerProps>`
    background-color:${({ background }) => background};
    width: 100%;
    height: 100%;
`

export const Wrapper = styled.div`
    padding: 30px 0;
`

export const List = styled.ul`
    display: flex;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
`

export const Link = styled(ScrollLink)<LinkProps>`
    color:${({ color }) => color};
    font-size: 18px;
    cursor: pointer;
    font-weight: 600;
    
    @media screen and (max-width: 380px) {
        font-size: 14px;
    }
`