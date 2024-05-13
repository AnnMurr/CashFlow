import { FC, useEffect, useRef, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { CategorySelectionModal } from "../categorySelectionModal/categorySelectionModal";
import { DarkBackground } from "../../../../shared/darkBackground/darkBackground";
import { EnteringModal } from "../../../../shared/enteringModal/enteringModal";
import { AlertComponent, AlertComponentProps } from "../../../../shared/alert/alert";
import { Loading } from "../../../../shared/loading/loading";
import { getDataFromLocalStorage } from "../../../../../storage/localStorage/localStorage";
import { changeUserData, getDataFromUserStore } from "../../../../../api/userDataApi/userDataApi";
import { CategoriesExpensesType } from "../../../../../api/userDataApi/styledUserDataApi";
import { getCurrentDate } from "../../../../../utils/getCurrentDate";
import { Container, List, Item, AddCategoryBtn, AddCategoryBtnInner, CategoryName, IconInner } from "./styledBody";

export const Body: FC = () => {
    const [isCategorySelectionModalActive, setIsCategorySelectionModalActive] = useState<boolean>(false);
    const [categories, setCategories] = useState<Array<CategoriesExpensesType> | null>(null);
    const [isAlertActive, setIsAlertActive] = useState<AlertComponentProps | null>(null);
    const [isEnteringModalActive, setIsEnteringModalActive] = useState<boolean>(false);
    const [showDeleteIcons, setShowDeleteIcons] = useState<Array<boolean>>([]);
    const [choosedCategory, setChoosedCategory] = useState<string>("");
    const [costValue, setCostValue] = useState<string>("");
    const darkBackgroundRef = useRef<HTMLDivElement>(null);
    let holdTimer: NodeJS.Timeout;

    const toggleCategorySelectionModal = () => {
        setIsCategorySelectionModalActive(true);
    }

    const getUserDataFromStorage = async () => {
        const token = getDataFromLocalStorage("token");

        try {
            const userDataFromStorage = await getDataFromUserStore(token);
            setCategories(userDataFromStorage.data.categoriesExpenses);
        } catch (error) {
            console.log(error);
        }
    }

    const handleClickOutsideModal = (event: any) => {
        if (darkBackgroundRef.current && darkBackgroundRef.current.contains(event.target)) {
            isCategorySelectionModalActive && setIsCategorySelectionModalActive(false);
            isEnteringModalActive && setIsEnteringModalActive(false);
        }
    }

    useEffect(() => {
        getUserDataFromStorage();
    }, []);

    useEffect(() => {
        if (isCategorySelectionModalActive || isEnteringModalActive)
            window.addEventListener("click", handleClickOutsideModal);

        return () => {
            window.removeEventListener("click", handleClickOutsideModal);
        };
    }, [isCategorySelectionModalActive, isEnteringModalActive]);

    const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
        if ((event.target as HTMLElement).classList.contains("item-btn")) return;
        event.currentTarget.classList.add("shake-horizontal");

        holdTimer = setTimeout(() => {
            setShowDeleteIcons([]);
            setShowDeleteIcons(prevState => {
                const newShowDeleteIcons = [...prevState];
                newShowDeleteIcons[index] = true;
                return newShowDeleteIcons;
            });
        }, 1000);
    };

    const handleMouseUp = () => {
        clearTimeout(holdTimer);
    };

    const deleteCategory = async (event: MouseEvent) => {
        const target = event.target as HTMLElement;

        if (target.classList.contains("item-btn")) {
            const token = getDataFromLocalStorage("token");
            const userDataFromStorage = await getDataFromUserStore(token);
            const categoryName = target.previousElementSibling?.children[0].textContent;
            const categoriesExpenses = userDataFromStorage.data.categoriesExpenses;
            const updatedUserData = categoriesExpenses.filter((item: any) => item.name !== categoryName);

            try {
                userDataFromStorage.data.categoriesExpenses = [...updatedUserData];
                await changeUserData(token, userDataFromStorage);
                getAlert({ type: "success", text: "Category deleted successfully" });
                getUserDataFromStorage();
                setShowDeleteIcons([]);
            } catch (error) {
                getAlert({ type: "warning", text: "Please try again later." });
                console.error(error);
            }
        } else {
            setShowDeleteIcons([]);
        }
    }

    useEffect(() => {
        showDeleteIcons.length > 0 &&
            window.addEventListener("click", deleteCategory);

        return () => {
            window.removeEventListener("click", deleteCategory);
        };
    }, [showDeleteIcons]);

    const openEnteringExpensesModal = (event: React.MouseEvent<HTMLButtonElement>) => {
        const category = event.currentTarget.children[1].children[0].textContent;
        category && setChoosedCategory(category);
        setIsEnteringModalActive(true);
    }

    const addExpenses = async () => {
        const token = getDataFromLocalStorage("token");
        try {
            const dataFromUserStore = await getDataFromUserStore(token);
            const expenses = dataFromUserStore.data.expenses;

            expenses.push({
                category: choosedCategory,
                date: getCurrentDate(),
                sum: costValue,
            })

            const userDataAfterUpdate = await changeUserData(token, dataFromUserStore);

            if (userDataAfterUpdate) {
                getAlert({ type: "success", text: "Adding expenses sucsesfuly" });
                setIsEnteringModalActive(false);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const getAlert = (data: AlertComponentProps) => {
        setIsAlertActive({ type: data.type, text: data.text });
        setTimeout(() => setIsAlertActive(null), 3000);
    }

    return (
        <Container>
            {categories ?
                <>
                    <List>
                        {categories && categories.map((category: any, index: number) => (
                            <Item key={uuidV4()}>
                                <button
                                    onMouseDown={(event) => handleMouseDown(event, index)}
                                    onMouseUp={handleMouseUp}
                                    onClick={openEnteringExpensesModal}>
                                    <IconInner>
                                        <img src={category.icon} alt={category.name} />
                                    </IconInner>
                                    <CategoryName>
                                        <span>{category.name}</span>
                                    </CategoryName>
                                    {showDeleteIcons[index] && (
                                        <button
                                            className="item-btn"
                                            style={{
                                                position: 'absolute',
                                                top: '5px',
                                                right: '5px',
                                                cursor: 'pointer',
                                            }} >
                                            <FontAwesomeIcon
                                                style={{ pointerEvents: "none" }}
                                                color="#000"
                                                icon={faCircleXmark} />
                                        </button>
                                    )}
                                </button>
                            </Item>
                        ))}
                    </List>
                    <AddCategoryBtnInner>
                        <AddCategoryBtn onClick={toggleCategorySelectionModal} type="button"></AddCategoryBtn>
                    </AddCategoryBtnInner>
                </> :
                <Loading />
            }

            {isCategorySelectionModalActive ?
                <>
                    <CategorySelectionModal
                        getUserDataFromStorage={getUserDataFromStorage}
                        setIsAlertActive={setIsAlertActive}
                        togleModal={setIsCategorySelectionModalActive} />
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
                        addExpenses={addExpenses}
                        closeModal={setIsEnteringModalActive} />
                    <DarkBackground type={"clickable"} darkBackgroundRef={darkBackgroundRef} />
                </>
                : null}
        </Container>
    )
}