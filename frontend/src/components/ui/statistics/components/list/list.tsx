import React, { useRef } from "react";
import { FC, useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { getDataFromUserStore } from "../../../../../api/userDataApi/userDataApi";
import { getDataFromLocalStorage } from "../../../../../storage/localStorage/localStorage";
import { ItemDay } from "./components/itemDay/itemDay";
import { Item } from "./components/item/item";
import { getCurrentDate } from "../../../../../utils/getCurrentDate";
import { ItemType, ItemsType, LineProps } from "./types";
import { EditCategoryModal } from "./components/editCategoryModal/editCategoryModal";
import { DarkBackground } from "../../../../shared/darkBackground/darkBackground";
import { AlertComponent, AlertComponentProps } from "../../../../shared/alert/alert";
import { ItemsInner } from "./styledList";

export const Line: FC<LineProps> = ({ data, setIsEditCategoryModalActive, setChoosedCategoryId }) => {
    return (
        <ItemsInner>
            {data.map(item => (
                <li key={uuidV4()}>
                    <Item
                        setIsEditCategoryModalActive={setIsEditCategoryModalActive}
                        dataItem={item}
                        setChoosedCategoryId={setChoosedCategoryId} />
                </li>
            ))}
        </ItemsInner>
    )
}

export const List: FC = () => {
    const [items, setItems] = useState<ItemsType | null>(null);
    const [days, setDays] = useState<Array<string> | null>(null);
    const [isEditCategoryModalActive, setIsEditCategoryModalActive] = useState<boolean>(false);
    const [choosedCategoryId, setChoosedCategoryId] = useState<string | null>(null);
    const [isAlertActive, setIsAlertActive] = useState<AlertComponentProps | null>(null);
    const darkBackgroundRef = useRef<HTMLDivElement>(null);

    const getDataDataForStatistic = async () => {
        const token = getDataFromLocalStorage("token");
        const data = await getDataFromUserStore(token);
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

        setDays(sortedDays);
        setItems(financialData);
    }

    useEffect(() => { getDataDataForStatistic() }, []);

    useEffect(() => {
        const handleClickOutsideModal = (event: MouseEvent) => {
            if (darkBackgroundRef.current && darkBackgroundRef.current.contains(event.target as HTMLElement)) {
                isEditCategoryModalActive && setIsEditCategoryModalActive(false);
            }
        }

        if (isEditCategoryModalActive)
            window.addEventListener("click", handleClickOutsideModal);

        return () => {
            window.removeEventListener("click", handleClickOutsideModal);
        };
    }, [isEditCategoryModalActive]);

    return (
        <div>
            <div>
                {days &&
                    days.map(day => (
                        <React.Fragment key={uuidV4()}>
                            <div>
                                <ItemDay title={day} />
                            </div>
                            {items &&
                                <Line
                                    setIsEditCategoryModalActive={setIsEditCategoryModalActive}
                                    data={items[day]}
                                    setChoosedCategoryId={setChoosedCategoryId} />}
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
                {isAlertActive ? <AlertComponent type={isAlertActive.type} text={isAlertActive.text} /> : null}
            </div>
        </div>
    )
}