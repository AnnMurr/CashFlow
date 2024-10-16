import styled from "styled-components";

export const Container = styled.nav`
    display: flex;
    padding-bottom: 10px;
`

export const List = styled.ul`
    display: flex;

    @media screen and (max-width: 480px) {
        flex-direction: column;
    }
`

