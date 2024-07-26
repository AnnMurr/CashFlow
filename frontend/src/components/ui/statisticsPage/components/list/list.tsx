import React from "react";
import { FC, useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { useAppSelector } from "../../../../../redux/store/store";
import { ItemsType, RootState } from "../../../../../redux/reducers/userStorageReduser/types";
import { ItemDay } from "./components/itemDay/itemDay";
import { EditCategoryModal } from "./components/editCategoryModal/editCategoryModal";
import { DarkBackground } from "../../../../shared/darkBackground/darkBackground";
import { AlertComponentProps } from "../../../../shared/alert/alert";
import { DeleteCategoryModal } from "./components/deleteCategoryModal/deleteCategoryModal";
import { Loading } from "../../../../shared/loading/loading";
import { Line } from "./components/line/line";
import { LoadingInner } from "./styledList";

interface ListProps {
    setIsAlertActive: (value: AlertComponentProps | null) => void;
    statisticType: "expenses" | "income";
}

export const List: FC<ListProps> = ({ setIsAlertActive, statisticType }) => {
    const [items, setItems] = useState<ItemsType | null>(null);
    const [days, setDays] = useState<Array<string> | null>(null);
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
                {days ?
                    days.slice(0, 30).map(day => (
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
                    )) :
                    <LoadingInner>
                        <Loading size={40} height={3} />
                    </LoadingInner>}
                {isEditCategoryModalActive ?
                    <EditCategoryModal
                        setIsAlertActive={setIsAlertActive}
                        closeEditCategoryModal={setIsEditCategoryModalActive}
                        choosedCategoryId={choosedCategoryId}
                        statisticType={statisticType} />
                    : null}
                {isDeleteCategoryModalActive ?
                    <DeleteCategoryModal
                        setIsAlertActive={setIsAlertActive}
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