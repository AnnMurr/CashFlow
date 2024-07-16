import { FC } from "react";
import { getCurrentDate } from "../../../../../../../utils/getCurrentDate";
import { ItemType, RootState } from "../../../../../../../redux/reducers/userStorageReduser/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { hideScroll } from "../../../../../../../utils/toggleScroll";
import { useAppSelector } from "../../../../../../../redux/store/store";
import { Link } from "react-router-dom";
import { Container, Edit, IconInner, Settings, TimeEditBlock } from "./styledItem";
interface ItemProps {
    dataItem: ItemType;
    setIsEditCategoryModalActive: (value: boolean) => void;
    setIsDeleteCategoryModalActive: (value: boolean) => void;
    setChoosedCategoryId: (value: string) => void;
}

export const Item: FC<ItemProps> = ({ dataItem, setIsEditCategoryModalActive, setChoosedCategoryId, setIsDeleteCategoryModalActive }) => {
    const date = getCurrentDate(dataItem.date);
    const { isEditingData } = useAppSelector((state: RootState) => state.storage);

    const getEditModal = (event: any) => {
        setChoosedCategoryId(event.currentTarget.parentNode.parentNode.parentNode.id);
        setIsEditCategoryModalActive(true);
        hideScroll();
    }

    const getDeleteModal = (event: any) => {
        setChoosedCategoryId(event.currentTarget.parentNode.parentNode.parentNode.id)
        setIsDeleteCategoryModalActive(true);
        hideScroll();
    }

    const getData = (event: any) => {
        console.log(event.currentTarget.dataset["categorytype"]);
    }

    return (

        <Container
            onClick={getData}
            data-categorytype={dataItem.category}
            iseditingdata={isEditingData.toString()}
            id={dataItem.uid}>
            <IconInner>
                <img src={dataItem.icon} alt={dataItem.category} />
            </IconInner>
            <div>
                <span>{dataItem.category}</span>
            </div>
            <div>
                <span>{dataItem.sum}$</span>
            </div>
            <TimeEditBlock>
                <span>{date.split(" ")[1]}</span>
                {isEditingData ? <Settings>
                    <Edit onClick={getEditModal}>
                        <FontAwesomeIcon icon={faPen} />
                    </Edit>
                    <button onClick={getDeleteModal}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </Settings>
                    : null}
            </TimeEditBlock>
        </Container>

    )
}