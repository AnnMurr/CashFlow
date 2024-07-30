import { FC, useContext, useEffect } from "react";
import { getCurrentDate } from "../../../../../../../../../utils/getCurrentDate";
import { ItemType, RootState } from "../../../../../../../../../redux/reducers/userStorageReduser/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { hideScroll } from "../../../../../../../../../utils/toggleScroll";
import { getFormatCurrency } from "../../../../../../../../../utils/getFormatCurrency";
import { useAppDispatch, useAppSelector } from "../../../../../../../../../redux/store/store";
import { setChosenCategoryStatistic } from "../../../../../../../../../redux/reducers/userStorageReduser/userStorageReduser";
import { ThemeContextType } from "../../../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../../../contexts/themeContext/themeContext";
import { Category, Container, Edit, IconInner, Settings, TimeEditBlock, Date, Sum } from "./styledItem";

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
    const { isEditingData, chosenFilter, statisticalData, currency } = useAppSelector((state: RootState) => state.storage);
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    const getEditModal = (event: React.MouseEvent<HTMLButtonElement>) => {
        const target = event.currentTarget as HTMLButtonElement;
        const grandparent = target.parentNode?.parentNode?.parentNode as HTMLElement | null;
        setChoosedCategoryId && grandparent && setChoosedCategoryId(grandparent.id);
        setIsEditCategoryModalActive && setIsEditCategoryModalActive(true);
        hideScroll();
    }

    const getDeleteModal = (event: React.MouseEvent<HTMLButtonElement>) => {
        const target = event.currentTarget as HTMLButtonElement;
        const grandparent = target.parentNode?.parentNode?.parentNode as HTMLElement | null;
        setChoosedCategoryId && grandparent && setChoosedCategoryId(grandparent.id);
        setIsDeleteCategoryModalActive && setIsDeleteCategoryModalActive(true);
        hideScroll();
    }

    const getData = (event: React.MouseEvent<HTMLDivElement>) => {
        const category = event.currentTarget.dataset["categorytype"];

        if (statisticalData && chosenFilter) {
            const currentFilter = chosenFilter?.data;
            const chosenFilteredCategory = currentFilter.filter(item => item.category === category);
            dispatch(setChosenCategoryStatistic(chosenFilteredCategory));
        }
    }

    return categoryStatistic ?
        (<Container
            themestyles={themeContext.themeStyles}
            chosenfilter={chosenFilter !== null ? "true" : 'false'}
            categorystatistic={categoryStatistic.toString()}
            iseditingdata={isEditingData.toString()}
            id={dataItem.uid} >
            <div>
                <Sum themestyles={themeContext.themeStyles}>
                    {currency && <span>{getFormatCurrency(dataItem.sum, currency.code)}</span>}
                </Sum>
            </div>
            <TimeEditBlock>
                <Date themestyles={themeContext.themeStyles}>
                    <span>{date.split(" ")[0]}</span>
                    <span>{date.split(" ")[1]}</span>
                </Date>
            </TimeEditBlock>
        </Container>) :
        chosenFilter ?
            (<Container
                themestyles={themeContext.themeStyles}
                categorystatistic={categoryStatistic.toString()}
                chosenfilter={chosenFilter !== null ? "true" : 'false'}
                onClick={getData}
                data-categorytype={dataItem.category}
                iseditingdata={isEditingData.toString()}
                id={dataItem.uid}>
                <IconInner>
                    <img src={dataItem.icon} alt={dataItem.category} />
                </IconInner>
                <Category themestyles={themeContext.themeStyles} chosenfilter={chosenFilter !== null ? "true" : 'false'}>
                    <span>{dataItem.category}</span>
                </Category>
                <div>
                    <Sum themestyles={themeContext.themeStyles}>
                        {currency && <span>{getFormatCurrency(dataItem.sum, currency.code)}</span>}
                    </Sum>
                </div>
            </Container>)
            :
            (<Container
                themestyles={themeContext.themeStyles}
                chosenfilter={chosenFilter ? "true" : 'false'}
                categorystatistic={categoryStatistic.toString()}
                onClick={getData}
                data-categorytype={dataItem.category}
                iseditingdata={isEditingData.toString()}
                id={dataItem.uid}>
                <IconInner>
                    <img src={dataItem.icon} alt={dataItem.category} />
                </IconInner>
                <Category themestyles={themeContext.themeStyles} chosenfilter={chosenFilter !== null ? "true" : 'false'}>
                    <span>{dataItem.category}</span>
                </Category>
                <div>
                    <Sum themestyles={themeContext.themeStyles}>
                        {currency && <span>{getFormatCurrency(dataItem.sum, currency.code)}</span>}
                    </Sum>
                </div>
                <TimeEditBlock>
                    <Date themestyles={themeContext.themeStyles}>
                        <span>{date.split(" ")[1]}</span>
                    </Date>
                    {isEditingData ?
                        <Settings>
                            <Edit onClick={getEditModal}>
                                <FontAwesomeIcon color={themeContext.themeStyles.color} icon={faPen} />
                            </Edit>
                            <button onClick={getDeleteModal}>
                                <FontAwesomeIcon color={themeContext.themeStyles.color} icon={faTrash} />
                            </button>
                        </Settings>
                        : null}
                </TimeEditBlock>
            </Container>)
}