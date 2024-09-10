import { FC, useContext } from "react";
import { TableCell, TableRow } from "@mui/material";
import { getFormatCurrency } from "../../../../../../../utils/getFormatCurrency";
import { useAppSelector } from "../../../../../../../redux/store/store";
import { RootState } from "../../../../../../../redux/reducers/userStorageReduser/types";
import { ThemeContextType } from "../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../contexts/themeContext/themeContext";
import { Span } from "./styledCompletedCategoryRow";

interface CompletedCategoryRowProps {
    data: { name: string; sum: number };
}

export const CompletedCategoryRow: FC<CompletedCategoryRowProps> = ({ data }) => {
    const { currency } = useAppSelector((state: RootState) => state.storage);
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    const tableCellStyles = {
        borderBottom: `1px solid ${themeContext.themeStyles.budgetPlannerRowBorder}`
    };

    return (
        <TableRow>
            <TableCell sx={tableCellStyles} colSpan={1}>
                <Span themestyles={themeContext.themeStyles}>
                    {data.name}
                </Span>
            </TableCell>
            <TableCell sx={tableCellStyles} colSpan={4}>
                <Span themestyles={themeContext.themeStyles}>
                    {currency && getFormatCurrency(+data.sum, currency.code)}
                </Span>
            </TableCell>
        </TableRow>
    )
}