import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container  = styled.li`
    padding: 5px 0;
`

export const StyledLink  = styled(Link)`
    display: flex;
    align-items: center;

    & span {
        color: #fff;
        padding-left: 10px;
    }
`
