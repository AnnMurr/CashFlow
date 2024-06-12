import { FC } from "react";
import { Container, Wrapper } from "./styledEditCategoryModal";

export const EditCategoryModal: FC = () => {
    return (
        <Container>
            <Wrapper>
                <div>
                    <h3>Category</h3>
                </div>
                <div>
                    <span>Food</span>
                </div>
            </Wrapper>
        </Container>
    )
}