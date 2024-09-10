import { FC, useContext } from "react";
import { TableCell, TableRow } from "@mui/material";
import { BtnAdd } from "../../../../../../shared/btnAdd/btnAdd";
import { ThemeContextType } from "../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../contexts/themeContext/themeContext";
import { BtnAddInner } from "./styledCategoryInputAddBtn";

interface CategoryInputAddBtnProps {
    setIsCategoryInputRow: (value: boolean) => void;
}

export const CategoryInputAddBtn: FC<CategoryInputAddBtnProps> = ({ setIsCategoryInputRow }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    const tableCellStyles = {
        borderBottom: `1px solid ${themeContext.themeStyles.budgetPlannerRowBorder}`
    };

    return (
        <TableRow>
            <TableCell sx={tableCellStyles} colSpan={4} align="right">
                <BtnAddInner>
                    <BtnAdd func={() => setIsCategoryInputRow(true)} size={"40px"} />
                </BtnAddInner>
            </TableCell>
        </TableRow>
    )
}