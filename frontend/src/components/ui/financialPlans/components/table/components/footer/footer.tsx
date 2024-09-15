import { FC, useEffect, useState } from "react";
import { TableCell, TableFooter, TableRow } from "@mui/material";
import { getFormatCurrency } from "../../../../../../../utils/getFormatCurrency";
import { useAppSelector } from "../../../../../../../redux/store/store";
import { BudgetPlanning, RootState } from "../../../../../../../redux/reducers/userStorageReduser/types";
import { Total } from "./styledFooter";

interface FooterProps {
    data: BudgetPlanning;
}

export const Footer: FC<FooterProps> = ({ data }) => {
    const [totalAmount, setTotalAmount] = useState<number | null>(null);
    const { currency } = useAppSelector((state: RootState) => state.storage);

    useEffect(() => {
        const count = data.categories.reduce((acc, category) => acc + category.sum, 0);
        setTotalAmount(count);
    }, [data]);

    return (
        totalAmount !== null && currency ? (
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={1} align="left">
                        <Total>
                            Total
                        </Total>
                    </TableCell>
                    <TableCell colSpan={4} align="right">
                        <Total>
                            {getFormatCurrency(totalAmount, currency.code)}
                        </Total>
                    </TableCell>
                </TableRow>
            </TableFooter>) : null
    )
}