import styled from "styled-components";

export const AppIconsWrap = styled.h3`
    display: flex;
    padding: 40px 0;

    & a{
        transition: all 0.5s ease-in-out;

        &:first-child {
            margin-right: 10px;
        }

        &:last-child {
            margin-left: 10px;
        }

        &:hover {
            transform: scale(1.1, 1.1);
        }
    }
`
