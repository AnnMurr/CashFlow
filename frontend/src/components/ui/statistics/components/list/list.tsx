import React from "react";
import { FC, useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { useAppSelector } from "../../../../../redux/store/store";
import { ItemsType, LineProps, RootState } from "../../../../../redux/reducers/userStorageReduser/types";
import { ItemDay } from "./components/itemDay/itemDay";
import { Item } from "./components/item/item";
import { EditCategoryModal } from "./components/editCategoryModal/editCategoryModal";
import { DarkBackground } from "../../../../shared/darkBackground/darkBackground";
import { AlertComponentProps } from "../../../../shared/alert/alert";
import { DeleteCategoryModal } from "./components/deleteCategoryModal/deleteCategoryModal";
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
    getDataDataForStatistic: (value: "expenses" | "income") => void;
    statisticType:  "expenses" | "income";
}

export const List: FC<ListProps> = ({ setItems, items, setDays, days, setIsAlertActive, getDataDataForStatistic, statisticType }) => {
    const [isEditCategoryModalActive, setIsEditCategoryModalActive] = useState<boolean>(false);
    const [isDeleteCategoryModalActive, setIsDeleteCategoryModalActive] = useState<boolean>(false);
    const [choosedCategoryId, setChoosedCategoryId] = useState<string | null>(null);
    const { statisticalData, chosenCategoryStatistic } = useAppSelector((state: RootState) => state.storage);

    const currentSetIsModal = isEditCategoryModalActive
        ? setIsEditCategoryModalActive
        : setIsDeleteCategoryModalActive;

    const currentIsModal = isEditCategoryModalActive || isDeleteCategoryModalActive;

    useEffect(() => {
        if (statisticalData) {
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
                            <div>
                                <ItemDay title={day} />
                            </div>
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
                    <EditCategoryModal
                        setIsAlertActive={setIsAlertActive}
                        closeEditCategoryModal={setIsEditCategoryModalActive}
                        choosedCategoryId={choosedCategoryId}
                        getDataDataForStatistic={getDataDataForStatistic}
                        statisticType={statisticType} />
                    : null}
                {isDeleteCategoryModalActive ?
                    <DeleteCategoryModal
                        setIsAlertActive={setIsAlertActive}
                        getDataDataForStatistic={getDataDataForStatistic}
                        statisticType={statisticType}
                        choosedCategoryId={choosedCategoryId}
                        closeDeleteModal={setIsDeleteCategoryModalActive} />
                    : null}

                {currentIsModal ?
                    <DarkBackground
                        setIsModalActive={currentSetIsModal}
                        isModalActive={currentIsModal} />
                    : null}
            </div>
        </div>
    )
}