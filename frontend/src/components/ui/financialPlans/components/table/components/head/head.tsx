import { FC } from "react";
import { TableCell, TableHead, TableRow } from "@mui/material";
import { BudgetPlanning } from "../../../../../../../redux/reducers/userStorageReduser/types";
import { Period, Title } from "./styledHead";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface HeadProps {
    data: BudgetPlanning;
    setIsDeletePlanModal: (value: boolean) => void;
}

export const Head: FC<HeadProps> = ({ data, setIsDeletePlanModal }) => {
    const handleOpenDeletePlanModal = () => {
        setIsDeletePlanModal(true)
    }
    return (
        <TableHead>
            <TableRow>
                <TableCell colSpan={4}>
                    <Period>
                        {data.period}
                    </Period>
                </TableCell>
                <TableCell align="right" colSpan={4}>
                    <button onClick={handleOpenDeletePlanModal}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
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