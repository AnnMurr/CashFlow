import { FC } from "react";
import { Container } from "./styledCategoryName";

interface CategoryNameProps {
    name: string;
}

export const CategoryName: FC<CategoryNameProps> = ({ name }) => {
    return (
        <Container>
            <span>{name}</span>
        </Container>
    )
}