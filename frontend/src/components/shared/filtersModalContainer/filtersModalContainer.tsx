import { FC } from "react";
import { Container, Wrapper } from "./styledFiltersModalContainer";

interface FiltersModalContainerProps {
    children: React.ReactNode
}

export const FiltersModalContainer: FC<FiltersModalContainerProps> = ({ children }) => {
    return (
        <Container>
            <Wrapper>
                {children}
            </Wrapper>
        </Container>
    )
}