import { FC } from "react";
import { TableCell, TableRow } from "@mui/material";
import { BtnAdd } from "../../../../../../shared/btnAdd/btnAdd";
import { BtnAddInner } from "./styledCategoryInputAddBtn";

interface CategoryInputAddBtnProps {
    setIsCategoryInputRow: (value: boolean) => void;
}

export const CategoryInputAddBtn: FC<CategoryInputAddBtnProps> = ({ setIsCategoryInputRow }) => {
    return (
        <TableRow>
            <TableCell colSpan={4} align="right">
                <BtnAddInner>
                    <BtnAdd func={() => setIsCategoryInputRow(true)} size={"40px"} />
                </BtnAddInner>
            </TableCell>
        </TableRow>
    )
}