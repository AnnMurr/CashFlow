import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { useAppSelector } from "../../../../../redux/store/store";
import { CategoriesType, CategoryPlanning, RootState } from "../../../../../redux/reducers/userStorageReduser/types";
import { BtnClose } from "../../../../shared/btnClose/btnClose";
import { ButtonComponent } from "../../../../shared/button/button";
import { AlertComponentProps } from "../../../../shared/alert/alert";
import { MultipleSelectPlaceholder } from "../../../../shared/select/select";
import { ThemeContextType } from "../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../contexts/themeContext/themeContext";
import { OutlinedInputComponent } from "../../../../../components/shared/outlinedInput/outlinedInput";
import { showAlert } from "../../../../../utils/showAlert";
import { VALID_SUM_REGEX } from "../../../../../consts";
import { BtnInner, Container, Label, SelectWrapper, Tooltip, Wrapper } from "./styledEditModal";

interface EditCategoryModalProps {
    setIsEditModalActive: (value: boolean) => void;
    setIsAlertActive: (value: AlertComponentProps | null) => void;
    choosenEditCategory: CategoryPlanning | null;
    completedCategories: Array<CategoryPlanning>;
    setCompletedCategories: (value: Array<CategoryPlanning>) => void;
    availableCategories: Array<CategoriesType>;
}

export const EditModal: FC<EditCategoryModalProps> = ({
    setIsEditModalActive,
    setIsAlertActive,
    choosenEditCategory,
    completedCategories,
    setCompletedCategories,
    availableCategories
}) => {
    const [categoryName, setCategoryName] = useState<string>("");
    const [categorySum, setCategorySum] = useState<string>("");
    const [categoryNameError, setCategoryNameError] = useState<boolean>(false);
    const [isDisabledBtn, setIsDisabledBtn] = useState<boolean>(true);
    const [isSelectDisabled, setIsSelectDisabled] = useState<boolean>(true);
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    const { storageData } = useAppSelector((state: RootState) => state.storage);

    const handleSum = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        setCategorySum(target.value.trimStart());
        setCategoryNameError(false);
    }

    const saveChanges = () => {
        const sum = categorySum.toString().replace(',', '.');

        if (!VALID_SUM_REGEX.test(sum)) {
            showAlert({ type: "error", text: "Invalid input" }, setIsAlertActive, 3000);
            setCategoryNameError(true);
        } else {
            const updatedCategories = completedCategories.map(item => {
                if (item.name === choosenEditCategory?.name) {
                    return {
                        name: categoryName,
                        sum: +sum
                    }
                } else {
                    return item;
                }
            })
            setCompletedCategories(updatedCategories)
            setIsEditModalActive(false);
        }
    }

    useEffect(() => {
        if (choosenEditCategory) {
            setCategoryName(choosenEditCategory.name);
            setCategorySum(choosenEditCategory.sum.toString());
        }
    }, []);

    useEffect(() => {
        +categorySum !== choosenEditCategory?.sum || categoryName !== choosenEditCategory.name ?
            setIsDisabledBtn(false) :
            setIsDisabledBtn(true);
    }, [categorySum, categoryName]);

    useEffect(() => {
        setIsSelectDisabled(!availableCategories.length);
    }, [availableCategories]);

    return (
        <Container themestyles={themeContext.themeStyles}>
            <Wrapper>
                <BtnClose
                    btnInnerstyles={{ marginLeft: "auto" }}
                    closeBlock={() => setIsEditModalActive(false)}
                    size="lg" />
                <div>
                    <Label themestyles={themeContext.themeStyles}>Category</Label>
                    {categoryName && storageData &&
                        <SelectWrapper isdisabled={isSelectDisabled.toString()}>
                            <MultipleSelectPlaceholder
                                isDisabled={isSelectDisabled}
                                setCategoryName={setCategoryName}
                                categoryName={categoryName}
                                names={availableCategories} />
                            <Tooltip themestyles={themeContext.themeStyles}>
                                <span>
                                    There are no available categories
                                </span>
                            </Tooltip>
                        </SelectWrapper>}
                </div>
                <div>
                    <Label themestyles={themeContext.themeStyles}>Sum</Label>
                    <OutlinedInputComponent
                        maxLengthNumber={10}
                        isError={categoryNameError}
                        value={categorySum}
                        handleChange={handleSum}
                        placeholderValue={"Sum"}
                        type="text" />
                </div>
                <BtnInner>
                    <ButtonComponent
                        disabledValue={isDisabledBtn}
                        text="Save"
                        color="#fff"
                        type="button"
                        func={saveChanges} />
                </BtnInner>
            </Wrapper>
        </Container>
    )
}