import { FC } from "react";
import { ItemType, RootState } from "../../../../../../../redux/reducers/userStorageReduser/types";
import { useAppSelector } from "../../../../../../../redux/store/store";
import { v4 as uuidV4 } from "uuid";
import { Item } from "./components/item/item";
import { ItemsInner } from "./styledLine";

export interface LineProps {
    data: Array<ItemType>;
    setIsEditCategoryModalActive: (value: boolean) => void;
    setIsDeleteCategoryModalActive: (value: boolean) => void;
    setChoosedCategoryId: (value: string) => void;
}

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