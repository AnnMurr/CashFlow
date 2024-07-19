import { FC, useEffect } from "react";
import { getCurrentDate } from "../../../../../../../utils/getCurrentDate";
import { ItemType, RootState } from "../../../../../../../redux/reducers/userStorageReduser/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { hideScroll } from "../../../../../../../utils/toggleScroll";
import { useAppDispatch, useAppSelector } from "../../../../../../../redux/store/store";
import { setChosenCategoryStatistic } from "../../../../../../../redux/reducers/userStorageReduser/userStorageReduser";
import { Category, Container, Edit, IconInner, Settings, TimeEditBlock } from "./styledItem";
interface ItemProps {
    dataItem: ItemType;
    setIsEditCategoryModalActive?: (value: boolean) => void;
    setIsDeleteCategoryModalActive?: (value: boolean) => void;
    setChoosedCategoryId?: (value: string) => void;
    categoryStatistic: boolean;
}

export const Item: FC<ItemProps> = ({ dataItem, setIsEditCategoryModalActive, setChoosedCategoryId, setIsDeleteCategoryModalActive, categoryStatistic }) => {
    const date = getCurrentDate(dataItem.date);
    const dispatch = useAppDispatch();
    const { isEditingData, chosenFilter, statisticalData } = useAppSelector((state: RootState) => state.storage);

    const getEditModal = (event: any) => {
        setChoosedCategoryId && setChoosedCategoryId(event.currentTarget.parentNode.parentNode.parentNode.id);
        setIsEditCategoryModalActive && setIsEditCategoryModalActive(true);
        hideScroll();
    }

    const getDeleteModal = (event: any) => {
        setChoosedCategoryId && setChoosedCategoryId(event.currentTarget.parentNode.parentNode.parentNode.id)
        setIsDeleteCategoryModalActive && setIsDeleteCategoryModalActive(true);
        hideScroll();
    }

    const getData = (event: any) => {
        const category = event.currentTarget.dataset["categorytype"];

        if (statisticalData && chosenFilter) {
            const currentFilter = chosenFilter?.data;
            const chosenFilteredCategory = currentFilter.filter(item => item.category === category);
            dispatch(setChosenCategoryStatistic(chosenFilteredCategory));
        }
    }

    return categoryStatistic ?
        (<Container
            chosenfilter={chosenFilter !== null ? "true" : 'false'}
            categorystatistic={categoryStatistic.toString()}
            iseditingdata={isEditingData.toString()}
            id={dataItem.uid} >
            <div>
                <span>{dataItem.sum}$</span>
            </div>
            <TimeEditBlock>
                <span>{date.split(" ")[1]}</span>
            </TimeEditBlock>
        </Container>) :
        chosenFilter ?
            (<Container
                categorystatistic={categoryStatistic.toString()}
                chosenfilter={chosenFilter !== null ? "true" : 'false'}
                onClick={getData}
                data-categorytype={dataItem.category}
                iseditingdata={isEditingData.toString()}
                id={dataItem.uid}>
                <IconInner>
                    <img src={dataItem.icon} alt={dataItem.category} />
                </IconInner>
                <Category chosenfilter={chosenFilter !== null ? "true" : 'false'}>
                    <span>{dataItem.category}</span>
                </Category>
                <div>
                    <span>{dataItem.sum}$</span>
                </div>
            </Container>)
            :
            (<Container
                chosenfilter={chosenFilter ? "true" : 'false'}
                categorystatistic={categoryStatistic.toString()}
                onClick={getData}
                data-categorytype={dataItem.category}
                iseditingdata={isEditingData.toString()}
                id={dataItem.uid}>
                <IconInner>
                    <img src={dataItem.icon} alt={dataItem.category} />
                </IconInner>
                <Category chosenfilter={chosenFilter !== null ? "true" : 'false'}>
                    <span>{dataItem.category}</span>
                </Category>
                <div>
                    <span>{dataItem.sum}$</span>
                </div>
                <TimeEditBlock>
                    <span>{date.split(" ")[1]}</span>
                    {isEditingData ?
                        <Settings>
                            <Edit onClick={getEditModal}>
                                <FontAwesomeIcon icon={faPen} />
                            </Edit>
                            <button onClick={getDeleteModal}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </Settings>
                        : null}
                </TimeEditBlock>
            </Container>)
}