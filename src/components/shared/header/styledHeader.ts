import styled from "styled-components";

interface isActiveHeaderProps {
    active_prop: string;
}

export const Section = styled.header<isActiveHeaderProps>`
    background-color: ${({ active_prop }) => active_prop === "true" ? "#fff" : "#c33c21"};
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
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const Logo = styled.div`
    padding: 5px;
    background-color: #c33c21;
    border-radius: 10px;
`