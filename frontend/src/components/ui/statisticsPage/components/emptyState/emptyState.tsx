import { FC } from "react";
import { Title } from "./components/title/title";
import { Button } from "./components/button/button";
import { Buttons, Wrapper } from "./styledEmptyState";

export const EmptyState: FC = () => {
    return (
        <Wrapper>
            <Title />
            <Buttons>
                <Button text="Add income" link="/income" />
                <Button text="Add expenses" link="/expenses" />
            </Buttons>
        </Wrapper>
    )
}