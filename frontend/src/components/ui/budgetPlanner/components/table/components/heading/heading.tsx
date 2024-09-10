import { FC } from "react";
import { TableCell, TableHead, TableRow } from "@mui/material";
import { Title } from "./styledHeading";

export const Heading: FC = () => {
    return (
        <TableHead>
            <TableRow >
                <TableCell sx={{ width: '25rem' }} align="left" colSpan={1}>
                    <Title>Category</Title>
                </TableCell>
                <TableCell sx={{ width: '30%' }} align="left" colSpan={1}>
                    <Title>Sum</Title>
                </TableCell>
                <TableCell colSpan={1} />
                <TableCell colSpan={4} />
            </TableRow>
        </TableHead>
    )
}