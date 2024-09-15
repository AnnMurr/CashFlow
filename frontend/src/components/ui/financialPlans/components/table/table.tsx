import { FC, useContext, useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import Paper from '@mui/material/Paper';
import { v4 as uuidV4 } from "uuid";
import { useAppSelector } from "../../../../../redux/store/store";
import { BudgetPlanning, CategoryPlanning, RootState } from "../../../../../redux/reducers/userStorageReduser/types";
import { getFormatCurrency } from "../../../../../utils/getFormatCurrency";
import { ThemeContextType } from "../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../contexts/themeContext/themeContext";
import { Edit, Period, Settings, TableRowStyled, Title, Total } from "./styledFinancialPlansTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

interface FinancialPlansTableProps {
    data: BudgetPlanning;
    setIsDeleteCategoryModal: (value: boolean) => void;
    setChoosenEditCategory: (value: CategoryPlanning | null) => void;
}

export const FinancialPlansTable: FC<FinancialPlansTableProps> = ({ 
    data, setIsDeleteCategoryModal, setChoosenEditCategory }) => {
    const [totalAmount, setTotalAmount] = useState<number | null>(null);
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    const { currency } = useAppSelector((state: RootState) => state.storage);

    useEffect(() => {
        const count = data.categories.reduce((acc, category) => acc + category.sum, 0);
        setTotalAmount(count);
    }, []);

    const handleOpenDeleteCategoryModal = (item: CategoryPlanning) => {
        setChoosenEditCategory({name: item.name, sum: item.sum});
        setIsDeleteCategoryModal(true);
    }

    return (
        <TableContainer sx={{ backgroundColor: themeContext.themeStyles.budgetPlannerBackground }} component={Paper}>
            <Table>
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
                {totalAmount && currency &&
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={1} align="left">
                                <Total>
                                    Total
                                </Total>
                            </TableCell>
                            <TableCell colSpan={4} align="right">
                                <Total>
                                    {getFormatCurrency(totalAmount, currency.code)}
                                </Total>
                            </TableCell>
                        </TableRow>
                    </TableFooter>}
            </Table>
        </TableContainer>
    )
}