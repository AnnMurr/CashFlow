import { FC } from "react";
import SelectLabels from "./components/select/select";
import { DeleteBtn } from "./components/deleteBtn/deleteBtn";
import { Wrapper } from "./styledHeader";

export const Header: FC = () => {
    return (
        <div>
            <Wrapper>
                <SelectLabels />
                <DeleteBtn />
            </Wrapper>
        </div>
    )
}
