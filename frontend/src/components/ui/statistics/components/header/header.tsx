import { FC } from "react";
import { DeleteBtn } from "./components/deleteBtn/deleteBtn";
import { SelectLabels } from "./components/select/select";
import { Wrapper } from "./styledHeader";

interface HeaderProps {
    openDatePikerModal: (value: boolean) => void;
}

export const Header: FC<HeaderProps> = ({ openDatePikerModal }) => {
    return (
        <div>
            <Wrapper>
                <SelectLabels openDatePikerModal={openDatePikerModal} />
                <DeleteBtn />
            </Wrapper>
        </div>
    )
}
