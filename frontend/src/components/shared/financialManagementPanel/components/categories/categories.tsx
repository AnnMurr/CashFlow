import { FC, useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { getDataFromLocalStorage } from "../../../../../storage/localStorage/localStorage";
import { AlertComponentProps } from "../../../../shared/alert/alert";
import { Loading } from "../../../../shared/loading/loading";
import { Cross } from "./components/cross/cross";
import { CategoryName } from "./components/categoryName/categoryName";
import { Icon } from "./components/icon/icon";
import { changeUserData, getDataFromUserStore } from "../../../../../redux/reducers/userStorageReduser/userStorageReduser";
import { useAppDispatch } from "../../../../../redux/store/store";
import { CategoriesType, CategoryKeys, UserStorageDataType } from "../../../../../redux/reducers/userStorageReduser/types";
import { CrossBtnInner, Item, List } from "./styledCategories";
import { getAlert } from "../../../../../utils/getAlert";
interface CategoriesProps {
    categoriesList: Array<CategoriesType> | null;
    setChoosedCategory: (value: { category: string, icon: string } | null) => void;
    getUserDataFromStorage: () => void;
    setIsEnteringModalActive: (value: boolean) => void;
    dataKey: CategoryKeys;
    setIsAlertActive: (value: AlertComponentProps | null) => void;
}

export const Categories: FC<CategoriesProps> = ({
    categoriesList,
    setChoosedCategory,
    getUserDataFromStorage,
    setIsEnteringModalActive,
    dataKey,
    setIsAlertActive }) => {
    const [showDeleteIcons, setShowDeleteIcons] = useState<Array<boolean>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const windowWidth = window.innerWidth;
    const dispatch = useAppDispatch();
    let holdTimer: NodeJS.Timeout;

    const handleMouseDown = (event: React.TouchEvent<HTMLLIElement>, index: number) => {
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

    const handleMouseUp = () => clearTimeout(holdTimer);

    const openEnteringExpensesModal = (event: React.MouseEvent<HTMLLIElement>) => {
        if (!(event.target as HTMLElement).classList.contains("item-btn")) {
            const category = (event.currentTarget as HTMLLIElement).children[1].children[0].textContent;
            const icon = (event.currentTarget as HTMLLIElement).children[0].children[0].getAttribute("src");

            if (category && icon) setChoosedCategory({ category: category, icon: icon });
            setIsEnteringModalActive(true);
        }
    }

    const deleteCategory = async (event: MouseEvent) => {
        setIsLoading(true);
        const target = event.target as HTMLElement;
        const token = getDataFromLocalStorage("token");
        const userDataFromStorage = (await dispatch(getDataFromUserStore(token))).payload as UserStorageDataType;
        let categoryName: undefined | string | null;

        target.parentNode && target.parentNode.previousSibling ?
            categoryName = target.parentNode.previousSibling.childNodes[0]?.textContent :
            getAlert({ type: "success", text: "Somthing was wrong" }, setIsAlertActive, 3000);

        if (categoryName && categoryName !== undefined) {
            const categoriesExpensesUpdating = [...userDataFromStorage.data[dataKey]].filter((item) => item.name !== categoryName);

            try {
                const updatedData = {
                    ...userDataFromStorage,
                    data: {
                        ...userDataFromStorage.data,
                        [dataKey]: categoriesExpensesUpdating
                    }
                };

                await dispatch(changeUserData({ userToken: token, updatedData: updatedData }));
                getAlert({ type: "success", text: "Category deleted successfully" }, setIsAlertActive, 3000);
                getUserDataFromStorage();
                setShowDeleteIcons([]);
            } catch (error) {
                getAlert({ type: "warning", text: "Please try again later." }, setIsAlertActive, 3000);
                console.error(error);
            }

            setIsLoading(false);
        }
    }

    useEffect(() => {
        const hideCrossBtn = (event: MouseEvent) => {
            const target = event.target as HTMLElement;

            if (!target.classList.contains("item-btn") &&
                !target.classList.contains("item-btn-inner")) {
                setShowDeleteIcons([]);
            }
        }

        if (windowWidth <= 1024) {
            showDeleteIcons.length > 0 && window.addEventListener("click", hideCrossBtn);
        }

        return () => {
            window.removeEventListener("click", hideCrossBtn);
        };
    }, [showDeleteIcons]);

    return (
        <>
            {!isLoading ?
                <List>
                    {categoriesList ? categoriesList.map((category: any, index: number) => (
                        <Item
                            onContextMenu={(event) => event.preventDefault()}
                            key={uuidV4()}
                            onTouchStart={windowWidth <= 1024 ? (event) => handleMouseDown(event, index) : undefined}
                            onTouchEnd={windowWidth <= 1024 ? handleMouseUp : undefined}
                            onClick={openEnteringExpensesModal}>
                            <Icon name={category.name} icon={category.icon} />
                            <CategoryName name={category.name} />
                            {showDeleteIcons[index] && windowWidth <= 1024 ? (
                                <div className="item-btn-inner">
                                    <Cross func={deleteCategory} />
                                </div>
                            ) :
                                <CrossBtnInner className="item-btn-inner">
                                    <Cross func={deleteCategory} />
                                </CrossBtnInner>}
                        </Item>
                    ))
                        : <Loading size={40} height={3} />}
                </List>
                : <Loading size={40} height={3} />}
        </>
    )
}