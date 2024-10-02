import { FC, useContext, useEffect, useState } from "react";
import { TableCell, TableFooter, TableRow } from "@mui/material";
import { getFormatCurrency } from "../../../../../../../utils/getFormatCurrency";
import { useAppSelector } from "../../../../../../../redux/store/store";
import { BudgetPlanning, RootState } from "../../../../../../../redux/reducers/userStorageReduser/types";
import { ThemeContextType } from "../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../contexts/themeContext/themeContext";
import { Total } from "./styledFooter";

interface FooterProps {
    data: BudgetPlanning;
}

export const Footer: FC<FooterProps> = ({ data }) => {
    const [totalAmount, setTotalAmount] = useState<number | null>(null);
    const { currency } = useAppSelector((state: RootState) => state.storage);
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    useEffect(() => {
        const count = data.categories.reduce((acc, category) => acc + category.sum, 0);
        setTotalAmount(count);
    }, [data]);

    const tableCellStyles = {
        borderBottom: "none"
    };

    return (
        totalAmount !== null && currency ? (
            <TableFooter>
                <TableRow>
                    <TableCell sx={tableCellStyles} colSpan={1} align="left">
                        <Total themestyles={themeContext.themeStyles}>
                            Total
                        </Total>
                    </TableCell>
                    <TableCell sx={tableCellStyles} colSpan={4} align="right">
                        <Total themestyles={themeContext.themeStyles}>
                            {getFormatCurrency(totalAmount, currency.code)}
                        </Total>
                    </TableCell>
                </TableRow>
            </TableFooter>) : null
    )
}