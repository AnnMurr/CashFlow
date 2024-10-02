import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../../redux/store/store";
import { RootState, Transaction, UserStorageDataType } from "../../../../../../../redux/reducers/userStorageReduser/types";
import { AlertComponentProps } from "../../../../../../shared/alert/alert";
import { VALID_SUM_REGEX } from "../../../../../../../consts/index";
import { getDataFromLocalStorage } from "../../../../../../../storage/localStorage/localStorage";
import { changeUserData } from "../../../../../../../redux/reducers/userStorageReduser/userStorageReduser";
import { showAlert } from "../../../../../../../utils/showAlert";
import { addScroll } from "../../../../../../../utils/toggleScroll";
import { getDataForStatistic } from "../../../../../../../utils/statisticalDataUtils";
import { ThemeContextType } from "../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../contexts/themeContext/themeContext";
import { BtnClose, ButtonComponent, MultipleSelectPlaceholder, OutlinedInputComponent } from ".";
import { BtnInner, Container, Label, Wrapper } from "./styledEditCategoryModal";

interface EditCategoryModalProps {
    choosedCategoryId: string | null;
    closeEditCategoryModal: (value: boolean) => void;
    setIsAlertActive: (value: AlertComponentProps | null) => void;
    statisticType: "expenses" | "income";
}

export const EditCategoryModal: FC<EditCategoryModalProps> = ({
    choosedCategoryId, closeEditCategoryModal, setIsAlertActive, statisticType }) => {
    const [categoryData, setCategoryData] = useState<null | Transaction>(null);
    const [categoryName, setCategoryName] = useState<string>("");
    const [categoryNameError, setCategoryNameError] = useState<boolean>(false);
    const [categorySum, setCategorySum] = useState<string>("");
    const [isDisabledBtn, setIsDisabledBtn] = useState<boolean>(true);
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    const dispatch = useAppDispatch();

    const { storageData, typesOfCategories, transactions } = useAppSelector((state: RootState) => state.storage);

    useEffect(() => {
        +categorySum !== categoryData?.sum || categoryName !== categoryData.category ?
            setIsDisabledBtn(false) :
            setIsDisabledBtn(true);
    }, [categorySum, categoryName]);

    useEffect(() => {
        const getCategoryData = () => {
            const currentCategory = transactions && transactions.find(item => item.uid === choosedCategoryId);

            if (currentCategory) {
                setCategoryData(currentCategory);
                currentCategory && setCategoryName(currentCategory?.category);
                currentCategory && setCategorySum(currentCategory?.sum.toString());
            }
        }

        getCategoryData();
    }, []);

    const saveChanges = async () => {
        const sum = categorySum.toString().replace(',', '.');

        if (!VALID_SUM_REGEX.test(sum)) {
            showAlert({ type: "error", text: "Invalid sum" }, setIsAlertActive, 3000);
            setCategoryNameError(true);
        } else {
            try {
                const token = getDataFromLocalStorage("token");
                const storageDataCopy: UserStorageDataType = JSON.parse(JSON.stringify(storageData));
                let newData = null;

                if (storageDataCopy && categoryData) {
                    const icon = typesOfCategories && typesOfCategories[categoryData?.type].find(item => item.name === categoryName)?.icon;

                    storageDataCopy.data[categoryData?.type].forEach(element => {
                        if (element.uid === categoryData?.uid) {
                            newData = {
                                ...element,
                                icon: icon ? icon : element.icon,
                                sum: parseFloat(sum),
                                category: categoryName
                            }
                        }
                    });

                    storageDataCopy.data[categoryData?.type] = storageDataCopy.data[categoryData?.type]
                        .filter(element => element.uid !== categoryData?.uid)
                    newData && storageDataCopy.data[categoryData?.type].push(newData);

                    const changeUserDataResponse = (await dispatch(changeUserData({ userToken: token, updatedData: storageDataCopy }))).payload

                    if (changeUserDataResponse) {
                        showAlert({ type: "success", text: "Data updated successfully" }, setIsAlertActive, 3000);
                        closeEditCategoryModal(false);
                        addScroll();
                        getDataForStatistic(statisticType, dispatch);
                    }
                }
            } catch (error) {
                console.error(error)
            }
        }
    }

    const handleSum = (event: ChangeEvent<HTMLInputElement>) => {
        setCategoryNameError(false);
        const target = event.target;
        setCategorySum(target.value.trimStart());
    }

    return (
        <Container themestyles={themeContext.themeStyles}>
            <Wrapper>
                <BtnClose
                    btnInnerstyles={{ marginLeft: "auto" }}
                    closeBlock={closeEditCategoryModal}
                    size="lg" />
                <div>
                    <Label themestyles={themeContext.themeStyles}>Category</Label>
                    {(typesOfCategories && categoryData) &&
                        <MultipleSelectPlaceholder
                            isDisabled={false}
                            setCategoryName={setCategoryName}
                            categoryName={categoryName}
                            names={typesOfCategories[categoryData?.type]} />}
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