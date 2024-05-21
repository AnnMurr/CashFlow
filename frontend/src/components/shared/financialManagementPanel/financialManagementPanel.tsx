import { FC, useEffect, useRef, useState } from "react";
import { DarkBackground } from "../../shared/darkBackground/darkBackground";
import { EnteringModal } from "../../shared/enteringModal/enteringModal";
import { CategorySelectionModal } from "../../shared/categorySelectionModal/categorySelectionModal";
import { AlertComponent, AlertComponentProps } from "../alert/alert";
import { Loading } from "../../shared/loading/loading";
import { getDataFromLocalStorage } from "../../../storage/localStorage/localStorage";
import { changeUserData, getDataFromUserStore } from "../../../api/userDataApi/userDataApi";
import { Categories } from "./components/categories/categories";
import { INVALID_CHARS_REGEXP } from "../../../consts/index";
import { Container, AddCategoryBtn, AddCategoryBtnInner } from "./styledFinancialManagementPanel";
interface FinancialManagementPanelProps {
    type: string;
    dataKey: string
    iconsCollection: Array<string>;
}

export const FinancialManagementPanel: FC<FinancialManagementPanelProps> = ({ type, dataKey, iconsCollection }) => {
    const [isCategorySelectionModalActive, setIsCategorySelectionModalActive] = useState<boolean>(false);
    const [categoriesList, setCategoriesList] = useState<Array<any> | null>(null);
    const [isAlertActive, setIsAlertActive] = useState<AlertComponentProps | null>(null);
    const [isEnteringModalActive, setIsEnteringModalActive] = useState<boolean>(false);
    const [choosedCategory, setChoosedCategory] = useState<{category: string, icon: string} | null>(null);
    const [costValue, setCostValue] = useState<string>("0");
    const darkBackgroundRef = useRef<HTMLDivElement>(null);

    const toggleCategorySelectionModal = () => setIsCategorySelectionModalActive(true);

    const getAlert = (data: AlertComponentProps) => {
        setIsAlertActive({ type: data.type, text: data.text });
        setTimeout(() => setIsAlertActive(null), 3000);
    }

    const getUserDataFromStorage = async () => {
        const token = getDataFromLocalStorage("token");

        try {
            const userDataFromStorage = await getDataFromUserStore(token);
            setCategoriesList(userDataFromStorage.data[dataKey]);
        } catch (error) {
            console.error(error);
        }
    }

    const addTransaction = async () => {
        const token = getDataFromLocalStorage("token");

        if (!INVALID_CHARS_REGEXP.test(costValue) || costValue === "0") {
            getAlert({ type: "error", text: "Invalid input" });
            console.error("Invalid input: only digits, '+', '-', '*', '/' are allowed");
        } else {
            try {
                const dataFromUserStore = await getDataFromUserStore(token);
                const transactions = dataFromUserStore.data[type];

                transactions.push({
                    category: choosedCategory?.category,
                    icon: choosedCategory?.icon,
                    date: new Date(),
                    sum: parseInt(costValue),
                });

                const userDataAfterUpdate = await changeUserData(token, dataFromUserStore);

                if (userDataAfterUpdate) {
                    getAlert({ type: "success", text: "Transaction added successfully" });
                    setIsEnteringModalActive(false);
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
                        getAlert={getAlert}
                        dataKey={dataKey} />
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
                        inputValue={costValue}
                        setInputValue={setCostValue}
                        addTransaction={addTransaction}
                        closeModal={setIsEnteringModalActive} />
                    <DarkBackground type={"clickable"} darkBackgroundRef={darkBackgroundRef} />
                </>
                : null}
        </Container>
    )
}