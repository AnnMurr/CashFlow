import { FC, useContext, useState } from "react";
import { TableCell, TableRow } from "@mui/material";
import { ButtonComponent } from "../../../../../../shared/button/button";
import { OutlinedInputComponent } from "../../../../../../shared/outlinedInput/outlinedInput";
import { MultipleSelectPlaceholder } from "../../../../../../shared/select/select";
import { showAlert } from "../../../../../../../utils/showAlert";
import { VALID_SUM_REGEX } from "../../../../../../../consts";
import { AlertComponentProps } from "../../../../../../shared/alert/alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ThemeContextType } from "../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../contexts/themeContext/themeContext";
import { CategoriesType, CategoryPlanning } from "../../../../../../../redux/reducers/userStorageReduser/types";

interface CategoryInputRowProps {
    setIsAlertActive: (value: AlertComponentProps | null) => void;
    setCompletedCategories: (value: Array<CategoryPlanning>) => void;
    setIsCategoryInputRow: (value: boolean) => void;
    completedCategories: Array<CategoryPlanning>;
    availableCategories: Array<CategoriesType>;
}

export const CategoryInputRow: FC<CategoryInputRowProps> = ({
    setIsAlertActive,
    setCompletedCategories,
    setIsCategoryInputRow,
    completedCategories,
    availableCategories
}) => {
    const [error, setError] = useState<boolean>(false);
    const [category, setCategory] = useState<string | null>(null);
    const [sum, setSum] = useState<string>("");
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    const handleSaveCategory = () => {
        const sum2 = sum.toString().replace(',', '.');

        if (sum && category) {
            if (!VALID_SUM_REGEX.test(sum2)) {
                setError(true);
                showAlert({ type: "error", text: "Invalid sum" }, setIsAlertActive, 3000);
            } else {
                setCompletedCategories([...completedCategories, { name: category, sum: parseFloat(sum) }]);
                setIsCategoryInputRow(false);
                setError(false);
                setSum("");
                setCategory(null);
            }
        } else {
            showAlert({ type: "error", text: "Enter category and sum" }, setIsAlertActive, 3000);
        }
    }

    const tableCellStyles = {
        borderBottom: `1px solid ${themeContext.themeStyles.budgetPlannerRowBorder}`
    };

    return (
        <TableRow>
            <TableCell align="left" colSpan={1} sx={{ ...tableCellStyles, width: '50%' }}>
                <MultipleSelectPlaceholder
                    isDisabled={false}
                    setCategoryName={setCategory}
                    categoryName={category}
                    names={availableCategories}
                />
            </TableCell>
            <TableCell align="left" colSpan={1} sx={{ ...tableCellStyles, width: '30%' }} >
                <OutlinedInputComponent
                    isError={error}
                    value={sum}
                    placeholderValue={"Sum"}
                    type={"text"}
                    maxLengthNumber={30}
                    handleChange={(event) => setSum(event.target.value.trimStart())}
                />
            </TableCell>
            <TableCell sx={{ ...tableCellStyles, paddingRight: "0", paddingLeft: "0" }} colSpan={1} >
                <ButtonComponent
                    disabledValue={false}
                    text="Save"
                    color="#fff"
                    type="button"
                    func={handleSaveCategory}
                />
            </TableCell>
            <TableCell align="right" sx={tableCellStyles} colSpan={1}  >
                <button onClick={() => setIsCategoryInputRow(false)}>
                    <FontAwesomeIcon color={themeContext.themeStyles.color} icon={faTrash} />
                </button>
            </TableCell>
        </TableRow>
    )
}