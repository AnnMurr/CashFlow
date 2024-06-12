import React from "react";
import { FC, useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { getDataFromUserStore } from "../../../../../api/userDataApi/userDataApi";
import { getDataFromLocalStorage } from "../../../../../storage/localStorage/localStorage";
import { ItemDay } from "./components/itemDay/itemDay";
import { Item } from "./components/item/item";
import { getCurrentDate } from "../../../../../utils/getCurrentDate";
import { ItemType, ItemsType, LineProps } from "./types";
import { EditCategoryModal } from "./components/editCategoryModal/editCategoryModal";

export const Line: FC<LineProps> = ({ data }) => {
    return (
        <ul>
            {data.map(item => (
                <li key={uuidV4()}>
                    <Item dataItem={item} />
                </li>
            ))}
        </ul>
    )
}

export const List: FC = () => {
    const [items, setItems] = useState<ItemsType | null>(null);
    const [days, setDays] = useState<Array<string> | null>(null);

    useEffect(() => {
        const getData = async () => {
            const token = getDataFromLocalStorage("token");
            const data = await getDataFromUserStore(token);
            const combinedAndSortedData = [...data.data.income, ...data.data.expenses];
            const financialData: ItemsType  = {};

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

            const sortedDays = Object.keys(financialData)
                .map(reverseDateRepresentation)
                .sort((a, b) => b.localeCompare(a)) 
                .map(date => {
                    const [year, month, day] = date.split('-');
                    return `${day}.${month}.${year}`;
                });

            for(const key in financialData) {
                financialData[key].sort((a: ItemType, b: ItemType) => {
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                });
            }

            setDays(sortedDays);
            setItems(financialData);
        }

        getData();
    }, []);

    return (
        <div>
            {days &&
                days.map(day => (
                    <React.Fragment key={uuidV4()}>
                        <div>
                            <ItemDay title={day} />
                        </div>
                        {items && <Line data={items[day]} />}
                    </React.Fragment>
                ))}

                <EditCategoryModal />
        </div>
    )
}