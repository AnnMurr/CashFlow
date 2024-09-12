import { FC, useContext } from "react";
import { TableCell } from "@mui/material";
import { getFormatCurrency } from "../../../../../../../utils/getFormatCurrency";
import { useAppSelector } from "../../../../../../../redux/store/store";
import { CategoryPlanning, RootState } from "../../../../../../../redux/reducers/userStorageReduser/types";
import { ThemeContextType } from "../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../contexts/themeContext/themeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Edit, Settings, Span, TableRowStyled } from "./styledCompletedCategoryRow";

interface CompletedCategoryRowProps {
    data: { name: string; sum: number };
    setIsEditModalActive: (value: boolean) => void;
    setIsDeleteCategoryModal: (value: boolean) => void;
    setChoosenEditCategory: (value: CategoryPlanning | null) => void;
}

export const CompletedCategoryRow: FC<CompletedCategoryRowProps> = ({ 
    data, setIsEditModalActive, setIsDeleteCategoryModal, setChoosenEditCategory }) => {
    const { currency } = useAppSelector((state: RootState) => state.storage);
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    const tableCellStyles = {
        borderBottom: `1px solid ${themeContext.themeStyles.budgetPlannerRowBorder}`
    };

    const openEditModal = () => {
        setChoosenEditCategory({name: data.name, sum: data.sum});
        setIsEditModalActive(true)
    }

    const openDeleteCategoryModal = () => {
        setChoosenEditCategory({name: data.name, sum: data.sum});
        setIsDeleteCategoryModal(true)
    }

    return (
            <TableRowStyled>
                <TableCell sx={tableCellStyles} colSpan={1}>
                    <Span themestyles={themeContext.themeStyles}>
                        {data.name}
                    </Span>
                </TableCell>
                <TableCell sx={tableCellStyles} colSpan={2}>
                    <Span themestyles={themeContext.themeStyles}>
                        {currency && getFormatCurrency(+data.sum, currency.code)}
                    </Span>
                </TableCell>
                <TableCell sx={tableCellStyles} align="right" colSpan={4}>
                    <Settings>
                        <Edit onClick={openEditModal}>
                            <FontAwesomeIcon color={themeContext.themeStyles.color} icon={faPen} />
                        </Edit>
                        <button onClick={openDeleteCategoryModal}>
                            <FontAwesomeIcon color={themeContext.themeStyles.color} icon={faTrash} />
                        </button>
                    </Settings>
                </TableCell>
            </TableRowStyled>
    )
}