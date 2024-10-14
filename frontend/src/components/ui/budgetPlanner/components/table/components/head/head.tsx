import { FC, useContext } from "react";
import { TableCell, TableHead, TableRow } from "@mui/material";
import { ThemeContextType } from "../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../contexts/themeContext/themeContext";
import { Title } from "./styledHeading";

export const Head: FC = () => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    const tableCellStyles = {
        borderBottom: `1px solid ${themeContext.themeStyles.budgetPlannerRowBorder}`,

        "@media screen and (max-width: 820px)": {
            padding: "5px"
        },
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell
                    sx={{
                        ...tableCellStyles,
                        width: '50%',

                        "@media screen and (max-width: 820px)": {
                            width: '32%',
                            padding: "5px"
                        }
                    }}
                    align="left"
                    colSpan={1}>
                    <Title themestyles={themeContext.themeStyles}>
                        Category
                    </Title>
                </TableCell>
                <TableCell
                    sx={{
                        ...tableCellStyles,
                        width: '30%',
                    }}
                    align="left"
                    colSpan={1}>
                    <Title themestyles={themeContext.themeStyles}>
                        Sum
                    </Title>
                </TableCell>
                <TableCell sx={tableCellStyles} colSpan={1} />
                <TableCell sx={tableCellStyles} colSpan={4} />
            </TableRow>
        </TableHead>
    )
}