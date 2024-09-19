import { FC, useContext } from "react";
import { TableCell, TableHead, TableRow } from "@mui/material";
import { BudgetPlanning } from "../../../../../../../redux/reducers/userStorageReduser/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ThemeContextType } from "../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../contexts/themeContext/themeContext";
import { Period, Title } from "./styledHead";

interface HeadProps {
    data: BudgetPlanning;
    setIsDeletePlanModal: (value: boolean) => void;
}

export const Head: FC<HeadProps> = ({ data, setIsDeletePlanModal }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    const handleOpenDeletePlanModal = () => {
        setIsDeletePlanModal(true)
    }

    const tableCellStyles = {
        borderBottom: `1px solid ${themeContext.themeStyles.budgetPlannerRowBorder}`
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell sx={tableCellStyles} colSpan={4}>
                    <Period themestyles={themeContext.themeStyles}>
                        {data.period}
                    </Period>
                </TableCell>
                <TableCell sx={tableCellStyles} align="right" colSpan={4}>
                    <button onClick={handleOpenDeletePlanModal}>
                        <FontAwesomeIcon
                            color={themeContext.themeStyles.color}
                            icon={faTrash} />
                    </button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell sx={{ ...tableCellStyles, width: '25rem' }} colSpan={1}>
                    <Title themestyles={themeContext.themeStyles}>
                        Category
                    </Title>
                </TableCell >
                <TableCell sx={{ ...tableCellStyles, width: '30%' }} colSpan={1} >
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