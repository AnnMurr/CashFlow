import { FC, useContext } from "react";
import { TableCell, TableRow } from "@mui/material";
import { BtnAdd } from "../../../../../../shared/btnAdd/btnAdd";
import { ThemeContextType } from "../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../contexts/themeContext/themeContext";
import { BtnAddInner, Tooltip } from "./styledCategoryInputAddBtn";

interface CategoryInputAddBtnProps {
    setIsCategoryInputRow: (value: boolean) => void;
    isDisabled: boolean;
}

export const CategoryInputAddBtn: FC<CategoryInputAddBtnProps> = ({ setIsCategoryInputRow, isDisabled }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    const tableCellStyles = {
        position: "relative",
        borderBottom: `1px solid ${themeContext.themeStyles.budgetPlannerRowBorder}`
    };

    return (
        <TableRow>
            <TableCell sx={tableCellStyles} colSpan={4} align="right">
                <BtnAddInner isdisabled={isDisabled.toString()}>
                    <BtnAdd isDisabled={isDisabled} func={() => setIsCategoryInputRow(true)} size={"40px"} />
                </BtnAddInner>
                <Tooltip themestyles={themeContext.themeStyles}>
                    <span>
                        There are no available categories
                    </span>
                </Tooltip>
            </TableCell>
        </TableRow>
    )
}