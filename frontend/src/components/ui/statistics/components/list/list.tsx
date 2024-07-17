import React, { useRef } from "react";
import { FC, useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { getDataFromUserStore, setStatisticalData } from "../../../../../redux/reducers/userStorageReduser/userStorageReduser";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store/store";
import { ItemType, ItemsType, LineProps, RootState, UserStorageDataType } from "../../../../../redux/reducers/userStorageReduser/types";
import { getDataFromLocalStorage } from "../../../../../storage/localStorage/localStorage";
import { ItemDay } from "./components/itemDay/itemDay";
import { Item } from "./components/item/item";
import { getCurrentDate } from "../../../../../utils/getCurrentDate";
import { EditCategoryModal } from "./components/editCategoryModal/editCategoryModal";
import { DarkBackground } from "../../../../shared/darkBackground/darkBackground";
import { AlertComponentProps } from "../../../../shared/alert/alert";
import { DeleteCategoryModal } from "./components/deleteCategoryModal/deleteCategoryModal";
import { addScroll } from "../../../../../utils/toggleScroll";
import { ItemsInner } from "./styledList";

export const Line: FC<LineProps> = ({ 
    data, setIsEditCategoryModalActive, setChoosedCategoryId, setIsDeleteCategoryModalActive 
}) => {
    const { chosenCategoryStatistic } = useAppSelector((state: RootState) => state.storage);

    return (
        <ItemsInner>
            {chosenCategoryStatistic ?
                data && data.map(item => (
                    <li key={uuidV4()}>
                        <Item
                            categoryStatistic={true}
                            dataItem={item} />
                    </li>
                ))
                : data && data.map(item => (
                    <li key={uuidV4()}>
                        <Item
                            categoryStatistic={false}
                            setIsDeleteCategoryModalActive={setIsDeleteCategoryModalActive}
                            setIsEditCategoryModalActive={setIsEditCategoryModalActive}
                            dataItem={item}
                            setChoosedCategoryId={setChoosedCategoryId} />
                    </li>
                ))}
        </ItemsInner>
    )
}
interface ListProps {
    setItems: (value: ItemsType | null) => void;
    items: ItemsType | null;
    setDays: (value: Array<string> | null) => void;
    days: Array<string> | null;
    setIsAlertActive: (value: AlertComponentProps | null) => void;
}

export const List: FC<ListProps> = ({ setItems, items, setDays, days, setIsAlertActive }) => {
    const [isEditCategoryModalActive, setIsEditCategoryModalActive] = useState<boolean>(false);
    const [isDeleteCategoryModalActive, setIsDeleteCategoryModalActive] = useState<boolean>(false);
    const [choosedCategoryId, setChoosedCategoryId] = useState<string | null>(null);
    const { statisticalData, chosenCategoryStatistic } = useAppSelector((state: RootState) => state.storage);
    const darkBackgroundRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();

    const getDataDataForStatistic = async () => {
        const token = getDataFromLocalStorage("token");
        const data = (await dispatch(getDataFromUserStore(token))).payload as UserStorageDataType;
        const combinedAndSortedData = [...data.data.income, ...data.data.expenses];
        const financialData: ItemsType = {};

        combinedAndSortedData.forEach(item => {
            const newDate = getCurrentDate(item.date);
            const day = newDate.split(" ")[0];

            if (financialData.hasOwnProperty(day)) {
                financialData[day].push(item);
            } else {
                financialData[day] = [item];
            }
        })

        const reverseDateRepresentation = (date: string): string => {
            const [day, month, year] = date.split('.');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        };

        const sortedDays = Object.keys(financialData).map(reverseDateRepresentation)
            .sort((a, b) => b.localeCompare(a))
            .map(date => {
                const [year, month, day] = date.split('-');
                return `${day}.${month}.${year}`;
            });

        for (const key in financialData) {
            financialData[key].sort((a: ItemType, b: ItemType) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            });
        }

        dispatch(setStatisticalData({ days: sortedDays, data: financialData }))
    }

    useEffect(() => { getDataDataForStatistic() }, []);

    useEffect(() => {
        const handleClickOutsideModal = (event: MouseEvent) => {
            if (darkBackgroundRef.current && darkBackgroundRef.current.contains(event.target as HTMLElement)) {
                isEditCategoryModalActive && setIsEditCategoryModalActive(false);
                isDeleteCategoryModalActive && setIsDeleteCategoryModalActive(false);
                addScroll();
            }
        }

        if (isEditCategoryModalActive || isDeleteCategoryModalActive)
            window.addEventListener("click", handleClickOutsideModal);

        return () => {
            window.removeEventListener("click", handleClickOutsideModal);
        };
    }, [isEditCategoryModalActive, isDeleteCategoryModalActive]);

    useEffect(() => {
        if (statisticalData) {
            console.log("statisticalData", statisticalData)
            setDays(statisticalData?.days);
            setItems(statisticalData?.data);
        }
    }, [statisticalData]);

    return (
        <div>
            <div>
                {days &&
                    days.map(day => (
                        <React.Fragment key={uuidV4()}>
                            {
                                <div>
                                    <ItemDay title={day} />
                                </div>}
                            {chosenCategoryStatistic ?
                                <Line
                                    setIsEditCategoryModalActive={setIsEditCategoryModalActive}
                                    setIsDeleteCategoryModalActive={setIsDeleteCategoryModalActive}
                                    data={chosenCategoryStatistic}
                                    setChoosedCategoryId={setChoosedCategoryId} /> :
                                items ?
                                    <Line
                                        setIsEditCategoryModalActive={setIsEditCategoryModalActive}
                                        setIsDeleteCategoryModalActive={setIsDeleteCategoryModalActive}
                                        data={items[day]}
                                        setChoosedCategoryId={setChoosedCategoryId} />
                                    : null}
                        </React.Fragment>
                    ))}
                {isEditCategoryModalActive ?
                    <>
                        <EditCategoryModal
                            setIsAlertActive={setIsAlertActive}
                            closeEditCategoryModal={setIsEditCategoryModalActive}
                            choosedCategoryId={choosedCategoryId}
                            getDataDataForStatistic={getDataDataForStatistic} />
                        <DarkBackground
                            type={"clickable"}
                            darkBackgroundRef={darkBackgroundRef} />
                    </> : null}
                {isDeleteCategoryModalActive ?
                    <>
                        <DeleteCategoryModal
                            setIsAlertActive={setIsAlertActive}
                            getDataDataForStatistic={getDataDataForStatistic}
                            choosedCategoryId={choosedCategoryId}
                            closeDeleteModal={setIsDeleteCategoryModalActive} />
                        <DarkBackground
                            type={"clickable"}
                            darkBackgroundRef={darkBackgroundRef} />
                    </> : null}
            </div>
        </div>
    )
}