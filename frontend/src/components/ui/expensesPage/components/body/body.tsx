import { FC, useEffect, useRef, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { CategorySelectionModal } from "../categorySelectionModal/categorySelectionModal";
import { DarkBackground } from "../../../../shared/darkBackground/darkBackground";
import { AlertComponent, AlertComponentProps } from "../../../../shared/alert/alert";
import { getDataFromLocalStorage } from "../../../../../storage/localStorage/localStorage";
import { changeUserData, getDataFromUserStore } from "../../../../../api/userDataApi/userDataApi";
import { CategoriesExpensesType } from "../../../../../api/userDataApi/styledUserDataApi";
import { Container, List, Item, AddCategoryBtn, AddCategoryBtnInner, CategoryName, IconInner } from "./styledBody";

export const Body: FC = () => {
    const [isCategorySelectionModalActive, setIsCategorySelectionModalActive] = useState<boolean>(false);
    const [categories, setCategories] = useState<Array<CategoriesExpensesType> | null>(null);
    const [isAlertActive, setIsAlertActive] = useState<AlertComponentProps | null>(null);
    const [showDeleteIcons, setShowDeleteIcons] = useState<Array<boolean>>([]);
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
            setIsCategorySelectionModalActive(false);
        }
    }

    useEffect(() => {
        getUserDataFromStorage();
    }, []);

    useEffect(() => {
        isCategorySelectionModalActive &&
            window.addEventListener("click", handleClickOutsideModal);

        return () => {
            window.removeEventListener("click", handleClickOutsideModal);
        };
    }, [isCategorySelectionModalActive]);

    const handleMouseDown = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
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
                getAlert({ type: "success", text: "Category deleted successfully" })
                getUserDataFromStorage();
                setShowDeleteIcons([]);
            } catch (error) {
                getAlert({ type: "warning", text: "Please try again later." })
                console.error(error);
            }
        } else {
            setShowDeleteIcons([]);
        }
    }

    const getAlert = (data: AlertComponentProps) => {
        setIsAlertActive({ type: data.type, text: data.text });
        setTimeout(() => setIsAlertActive(null), 3000);
    }

    useEffect(() => {
        showDeleteIcons.length > 0 &&
            window.addEventListener("click", deleteCategory);

        return () => {
            window.removeEventListener("click", deleteCategory);
        };
    }, [showDeleteIcons]);

    return (
        <Container>
            <List>
                {categories && categories.map((category: any, index: number) => (
                    <Item
                        onMouseDown={(event) => handleMouseDown(event, index)}
                        onMouseUp={handleMouseUp}
                        key={uuidV4()}>
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
                    </Item>
                ))}
            </List>
            <AddCategoryBtnInner>
                <AddCategoryBtn onClick={toggleCategorySelectionModal} type="button"></AddCategoryBtn>
            </AddCategoryBtnInner>
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
        </Container>
    )
}