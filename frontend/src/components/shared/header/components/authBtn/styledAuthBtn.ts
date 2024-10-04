import { Link } from "react-router-dom";
import styled from "styled-components";

export const Button = styled(Link)`
    transition: all 0.5s ease;
    cursor: pointer;
    
    &:hover {
        transform: scale(1.1, 1.1);
    }
`