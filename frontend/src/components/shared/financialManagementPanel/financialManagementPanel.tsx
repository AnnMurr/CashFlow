import { FC, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { AlertComponent, AlertComponentProps } from "../alert/alert";
import { getDataFromLocalStorage } from "../../../storage/localStorage/localStorage";
import { VALID_SUM_REGEX } from "../../../consts/index";
import { useAppDispatch } from "../../../redux/store/store";
import { changeUserData, getDataFromUserStore } from "../../../redux/reducers/userStorageReduser/userStorageReduser";
import { CategoriesType, CategoryKeys, TransactionKeys, UserStorageDataType } from "../../../redux/reducers/userStorageReduser/types";
import { showAlert } from "../../../utils/showAlert";
import { Categories, CategorySelectionModal, DarkBackground, EnteringModal, Spinner } from ".";
import { Container } from "./styledFinancialManagementPanel";

interface FinancialManagementPanelProps {
    type: TransactionKeys;
    dataKey: CategoryKeys;
    iconsCollection: Array<string>;
}

export const FinancialManagementPanel: FC<FinancialManagementPanelProps> = ({ type, dataKey, iconsCollection }) => {
    const [isCategorySelectionModalActive, setIsCategorySelectionModalActive] = useState<boolean>(false);
    const [categoriesList, setCategoriesList] = useState<Array<CategoriesType> | null | null>(null);
    const [isAlertActive, setIsAlertActive] = useState<AlertComponentProps | null>(null);
    const [isEnteringModalActive, setIsEnteringModalActive] = useState<boolean>(false);
    const [choosedCategory, setChoosedCategory] = useState<{ category: string, icon: string } | null>(null);
    const [categorySum, setCategorySum] = useState<string>("0");
    const dispatch = useAppDispatch();

    const currentSetIsModal = isCategorySelectionModalActive
        ? setIsCategorySelectionModalActive
        : setIsEnteringModalActive;

    const currentIsModal = isCategorySelectionModalActive || isEnteringModalActive;

    const toggleCategorySelectionModal = () => setIsCategorySelectionModalActive(true);

    const getUserDataFromStorage = async () => {
        const token = getDataFromLocalStorage("token");

        try {
            const userDataFromStorage = (await dispatch(getDataFromUserStore(token))).payload as UserStorageDataType;
            setCategoriesList(userDataFromStorage.data[dataKey]);
        } catch (error) {
            console.error(error);
        }
    }

    const addTransaction = async () => {
        const token = getDataFromLocalStorage("token");

        if (!VALID_SUM_REGEX.test(categorySum)) {
            showAlert({ type: "error", text: "Invalid input" }, setIsAlertActive, 3000);
            console.error("Invalid input: only digits, '+', '-', '*', '/' are allowed");
        } else {
            try {
                if (type && choosedCategory) {
                    const dataFromUserStore = (await dispatch(getDataFromUserStore(token))).payload as UserStorageDataType;
                    const updatedTransactions = [...dataFromUserStore.data[type]];

                    updatedTransactions.push({
                        type: type,
                        category: choosedCategory?.category,
                        icon: choosedCategory?.icon,
                        date: new Date(),
                        sum: parseFloat(categorySum),
                        uid: uuidv4()
                    });

                    const updatedData = {
                        ...dataFromUserStore,
                        data: {
                            ...dataFromUserStore.data,
                            [type]: updatedTransactions
                        }
                    };

                    const userDataAfterUpdate = (await dispatch(changeUserData({ userToken: token, updatedData: updatedData }))).payload;

                    if (userDataAfterUpdate) {
                        showAlert({ type: "success", text: "Transaction added successfully" }, setIsAlertActive, 3000);
                        setIsEnteringModalActive(false);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    useEffect(() => { getUserDataFromStorage(); }, []);

    return (
        <Container>
            {categoriesList ?
                <>
                    <Categories
                        categoriesList={categoriesList}
                        setChoosedCategory={setChoosedCategory}
                        getUserDataFromStorage={getUserDataFromStorage}
                        setIsEnteringModalActive={setIsEnteringModalActive}
                        dataKey={dataKey}
                        setIsAlertActive={setIsAlertActive}
                        toggleCategorySelectionModal={toggleCategorySelectionModal} />
                </> :
                <Spinner size={40} height={3} />}
            {isCategorySelectionModalActive ?
                <CategorySelectionModal
                    getUserDataFromStorage={getUserDataFromStorage}
                    setIsAlertActive={setIsAlertActive}
                    togleModal={setIsCategorySelectionModalActive}
                    iconsCollection={iconsCollection}
                    dataKey={dataKey} />
                : null}
            {isEnteringModalActive ?
                <EnteringModal
                    setIsAlertActive={setIsAlertActive}
                    inputValue={categorySum}
                    setInputValue={setCategorySum}
                    addTransaction={addTransaction}
                    closeModal={setIsEnteringModalActive} />
                : null}
            {currentIsModal ?
                <DarkBackground
                    setIsModalActive={currentSetIsModal}
                    isModalActive={currentIsModal} />
                : null}
            {isAlertActive ? <AlertComponent type={isAlertActive.type} text={isAlertActive.text} /> : null}
        </Container>
    )
}