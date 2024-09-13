import { FC, useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Paper from '@mui/material/Paper';
import { v4 as uuidV4 } from "uuid";
import { useAppSelector } from "../../../../../redux/store/store";
import { BudgetPlanning, RootState } from "../../../../../redux/reducers/userStorageReduser/types";
import { getFormatCurrency } from "../../../../../utils/getFormatCurrency";
import { Period, Title, Total } from "./styledFinancialPlansTable";

interface FinancialPlansTableProps {
    data: BudgetPlanning;
}

export const FinancialPlansTable: FC<FinancialPlansTableProps> = ({ data }) => {
    const [totalAmount, setTotalAmount] = useState<number | null>(null);
    const { currency } = useAppSelector((state: RootState) => state.storage);

    useEffect(() => {
        const count = data.categories.reduce((acc, category) => acc + category.sum, 0);
        setTotalAmount(count);
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Period>
                                {data.period}
                            </Period>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Title>
                                Category
                            </Title>
                        </TableCell>
                        <TableCell align="right">
                            <Title>
                                Sum
                            </Title>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && currency &&
                        data.categories.map(item => (
                            <TableRow key={uuidV4()}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell align="right">{getFormatCurrency(item.sum, currency.code)}</TableCell>
                            </TableRow>
                        ))}
                    {totalAmount && currency &&
                        <TableRow>
                            <TableCell colSpan={2} align="right">
                                <Total>
                                    {getFormatCurrency(totalAmount, currency.code)}
                                </Total>
                            </TableCell>
                        </TableRow>}
                </TableBody>
            </Table>
        </TableContainer>
    )
}