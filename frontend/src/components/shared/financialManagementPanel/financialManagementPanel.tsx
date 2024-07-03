import { FC, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { CategorySelectionModal } from "../../shared/categorySelectionModal/categorySelectionModal";
import { DarkBackground } from "../../shared/darkBackground/darkBackground";
import { EnteringModal } from "../../shared/enteringModal/enteringModal";
import { Loading } from "../../shared/loading/loading";
import { AlertComponent, AlertComponentProps } from "../alert/alert";
import { getDataFromLocalStorage } from "../../../storage/localStorage/localStorage";
import { Categories } from "./components/categories/categories";
import { VALID_SUM_REGEX } from "../../../consts/index";
import { useAppDispatch } from "../../../redux/store/store";
import { changeUserData, getDataFromUserStore } from "../../../redux/reducers/userStorageReduser/userStorageReduser";
import { CategoryKeys, TransactionKeys, UserStorageDataType } from "../../../redux/reducers/userStorageReduser/types";
import { getAlert } from "../../../utils/getAlert";
import { Container, AddCategoryBtn, AddCategoryBtnInner } from "./styledFinancialManagementPanel";
interface FinancialManagementPanelProps {
    type: TransactionKeys;
    dataKey: CategoryKeys;
    iconsCollection: Array<string>;
}

export const FinancialManagementPanel: FC<FinancialManagementPanelProps> = ({ type, dataKey, iconsCollection }) => {
    const [isCategorySelectionModalActive, setIsCategorySelectionModalActive] = useState<boolean>(false);
    const [categoriesList, setCategoriesList] = useState<Array<any> | null>(null);
    const [isAlertActive, setIsAlertActive] = useState<AlertComponentProps | null>(null);
    const [isEnteringModalActive, setIsEnteringModalActive] = useState<boolean>(false);
    const [choosedCategory, setChoosedCategory] = useState<{ category: string, icon: string } | null>(null);
    const [categorySum, setCategorySum] = useState<string>("0");
    const darkBackgroundRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();

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
            getAlert({ type: "error", text: "Invalid input" }, setIsAlertActive, 3000);
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
                        getAlert({ type: "success", text: "Transaction added successfully" }, setIsAlertActive, 3000);
                        setIsEnteringModalActive(false);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    useEffect(() => {
        const handleClickOutsideModal = (event: MouseEvent) => {
            if (darkBackgroundRef.current && darkBackgroundRef.current.contains(event.target as HTMLElement)) {
                isCategorySelectionModalActive && setIsCategorySelectionModalActive(false);
                isEnteringModalActive && setIsEnteringModalActive(false);
            }
        }

        if (isCategorySelectionModalActive || isEnteringModalActive)
            window.addEventListener("click", handleClickOutsideModal);

        return () => {
            window.removeEventListener("click", handleClickOutsideModal);
        };
    }, [isCategorySelectionModalActive, isEnteringModalActive]);

    useEffect(() => {
        getUserDataFromStorage();
    }, []);

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
                        setIsAlertActive={setIsAlertActive} />
                    <AddCategoryBtnInner>
                        <AddCategoryBtn onClick={toggleCategorySelectionModal} type="button"></AddCategoryBtn>
                    </AddCategoryBtnInner>
                </> :
                <Loading size={40} height={3} />}
            {isCategorySelectionModalActive ?
                <>
                    <CategorySelectionModal
                        getUserDataFromStorage={getUserDataFromStorage}
                        setIsAlertActive={setIsAlertActive}
                        togleModal={setIsCategorySelectionModalActive}
                        iconsCollection={iconsCollection}
                        dataKey={dataKey} />
                    <DarkBackground type={"clickable"} darkBackgroundRef={darkBackgroundRef} />
                </>
                : null}
            {isAlertActive ?
                <AlertComponent type={isAlertActive.type} text={isAlertActive.text} />
                : null}
            {isEnteringModalActive ?
                <>
                    <EnteringModal
                    setIsAlertActive={setIsAlertActive}
                        inputValue={categorySum}
                        setInputValue={setCategorySum}
                        addTransaction={addTransaction}
                        closeModal={setIsEnteringModalActive} />
                    <DarkBackground type={"clickable"} darkBackgroundRef={darkBackgroundRef} />
                </>
                : null}
        </Container>
    )
}