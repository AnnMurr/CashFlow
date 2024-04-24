import { Link } from "react-router-dom";
import styled from "styled-components";

interface isActiveHeaderProps {
    active_prop: string;
}

export const Section = styled.header<isActiveHeaderProps>`
    background-color: ${({ active_prop }) => active_prop === "true" ? "#fff" : "#5B8A72"};
    position: sticky;
    z-index: 20;
    inset: 0 0 auto 0;
    border-bottom: ${({ active_prop }) => active_prop ? "1px solid #0000005e" : "none"};
`

export const Container = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 15px;
`

export const Wrapper = styled.div`
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const Logo = styled(Link)`
    padding: 5px;
  
    border-radius: 10px;
`

export const BtnAuth = styled(Link)`
    transition: all 0.5s ease;
    cursor: pointer;
    
    &:hover {
        transform: scale(1.1, 1.1);
    }
`