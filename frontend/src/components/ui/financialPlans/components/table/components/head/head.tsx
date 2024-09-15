import { FC } from "react";
import { TableCell, TableHead, TableRow } from "@mui/material";
import { BudgetPlanning } from "../../../../../../../redux/reducers/userStorageReduser/types";
import { Period, Title } from "./styledHead";

interface HeadProps {
    data: BudgetPlanning;
}

export const Head: FC<HeadProps> = ({ data }) => {
    return (
        <TableHead>
            <TableRow>
                <TableCell colSpan={4}>
                    <Period>
                        {data.period}
                    </Period>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell sx={{ width: '25rem' }} colSpan={1}>
                    <Title>
                        Category
                    </Title>
                </TableCell >
                <TableCell sx={{ width: '30%' }} colSpan={1} >
                    <Title>
                        Sum
                    </Title>
                </TableCell>
                <TableCell colSpan={1} />
                <TableCell colSpan={4} />
            </TableRow>
        </TableHead>
    )
}