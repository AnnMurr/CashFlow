import { FC, useContext } from "react";
import { v4 as uuidV4 } from "uuid";
import { TableBody, TableCell } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ThemeContextType } from "../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../contexts/themeContext/themeContext";
import { getFormatCurrency } from "../../../../../../../utils/getFormatCurrency";
import { useAppSelector } from "../../../../../../../redux/store/store";
import { BudgetPlanning, CategoryPlanning, RootState } from "../../../../../../../redux/reducers/userStorageReduser/types";
import { Edit, Settings, TableRowStyled } from "./styledBody";

interface BodyComponentProps {
    data: BudgetPlanning;
    handleOpenDeleteCategoryModal: (value: CategoryPlanning) => void;
}

export const BodyComponent: FC<BodyComponentProps> = ({ data, handleOpenDeleteCategoryModal }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    const { currency } = useAppSelector((state: RootState) => state.storage);

    return (
        <TableBody>
            {data && currency &&
                data.categories.map(item => (
                    <TableRowStyled key={uuidV4()}>
                        <TableCell colSpan={1}>{item.name}</TableCell>
                        <TableCell colSpan={1} >{getFormatCurrency(item.sum, currency.code)}</TableCell>
                        <TableCell align="right" colSpan={4}>
                            <Settings>
                                <Edit>
                                    <FontAwesomeIcon color={themeContext.themeStyles.color} icon={faPen} />
                                </Edit>
                                <button onClick={() => handleOpenDeleteCategoryModal(item)}>
                                    <FontAwesomeIcon color={themeContext.themeStyles.color} icon={faTrash} />
                                </button>
                            </Settings>
                        </TableCell>
                    </TableRowStyled>
                ))}
        </TableBody>
    )
}