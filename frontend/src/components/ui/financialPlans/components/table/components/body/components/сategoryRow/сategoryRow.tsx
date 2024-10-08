import { FC, useContext } from "react";
import { TableCell } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { getFormatCurrency } from "../../../../../../../../../utils/getFormatCurrency";
import { ThemeContextType } from "../../../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../../../contexts/themeContext/themeContext";
import { useAppSelector } from "../../../../../../../../../redux/store/store";
import { CategoryPlanning, RootState } from "../../../../../../../../../redux/reducers/userStorageReduser/types";
import { Edit, Settings, TableRowStyled } from "./styledCategoryRow";

interface CategoryRowProps {
    data: CategoryPlanning;
    handleOpenEditCategoryModal: (data: CategoryPlanning) => void;
    handleOpenDeleteCategoryModal: (data: CategoryPlanning) => void;
}

export const CategoryRow: FC<CategoryRowProps> = ({
    data, handleOpenEditCategoryModal, handleOpenDeleteCategoryModal }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    const { currency } = useAppSelector((state: RootState) => state.storage);

    const tableCellStyles = {
        color: themeContext.themeStyles.color,
        borderBottom: `1px solid ${themeContext.themeStyles.budgetPlannerRowBorder}`,

        "@media screen and (max-width: 580px)": {
            fontSize: "12px"
        }
    };

    return (
        data && currency &&
        (<TableRowStyled >
            <TableCell sx={tableCellStyles} colSpan={1}>{data.name}</TableCell>
            <TableCell sx={tableCellStyles} colSpan={1} >{getFormatCurrency(data.sum, currency.code)}</TableCell>
            <TableCell sx={tableCellStyles} align="right" colSpan={4}>
                <Settings>
                    <Edit onClick={() => handleOpenEditCategoryModal(data)}>
                        <FontAwesomeIcon color={themeContext.themeStyles.color} icon={faPen} />
                    </Edit>
                    <button onClick={() => handleOpenDeleteCategoryModal(data)}>
                        <FontAwesomeIcon color={themeContext.themeStyles.color} icon={faTrash} />
                    </button>
                </Settings>
            </TableCell>
        </TableRowStyled>)
    )
}