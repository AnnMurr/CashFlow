import { FC } from "react";
import { TableCell, TableRow } from "@mui/material";
import { getFormatCurrency } from "../../../../../../../utils/getFormatCurrency";
import { useAppSelector } from "../../../../../../../redux/store/store";
import { RootState } from "../../../../../../../redux/reducers/userStorageReduser/types";

interface CompletedCategoryRowProps {
    data: { name: string; sum: string };
}

export const CompletedCategoryRow: FC<CompletedCategoryRowProps> = ({ data }) => {
    const { currency } = useAppSelector((state: RootState) => state.storage);

    return (
        <TableRow>
            <TableCell colSpan={1}>
                {data.name}
            </TableCell>
            <TableCell colSpan={4}>
                {currency && getFormatCurrency(+data.sum, currency.code)}
            </TableCell>
        </TableRow>
    )
}