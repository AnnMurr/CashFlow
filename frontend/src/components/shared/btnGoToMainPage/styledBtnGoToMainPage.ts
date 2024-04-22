import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
`

export const Text = styled.div`
    padding-left: 5px;
    font-weight: 600;
`

export const StyledLink = styled(Link)`
    transition: all 0.5s ease;

    &:hover {
        transform: scale(1.1, 1.1);
    }
`