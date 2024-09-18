import { FC, useContext } from "react";
import { TableCell } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { getFormatCurrency } from "../../../../../../../../../utils/getFormatCurrency";
import { ThemeContextType } from "../../../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../../../contexts/themeContext/themeContext";
import { useAppSelector } from "../../../../../../../../../redux/store/store";
import { RootState } from "../../../../../../../../../redux/reducers/userStorageReduser/types";
import { Edit, Settings, TableRowStyled } from "./styledCategoryRow";

export const CategoryRow: FC<any> = ({
    data, handleOpenEditCategoryModal, handleOpenDeleteCategoryModal }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    const { currency } = useAppSelector((state: RootState) => state.storage);

    return (
        data && currency &&
        (<TableRowStyled >
            <TableCell colSpan={1}>{data.name}</TableCell>
            <TableCell colSpan={1} >{getFormatCurrency(data.sum, currency.code)}</TableCell>
            <TableCell align="right" colSpan={4}>
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