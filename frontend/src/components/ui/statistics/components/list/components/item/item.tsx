import { FC } from "react";
import { getCurrentDate } from "../../../../../../../utils/getCurrentDate";
import { ItemType } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Container, Edit, IconInner, Settings, TimeEditBlock } from "./styledItem";
import { hideScroll } from "../../../../../../../utils/toggleScroll";
interface ItemProps {
    dataItem: ItemType;
    setIsEditCategoryModalActive: (value: boolean) => void;
    setIsDeleteCategoryModalActive: (value: boolean) => void;
    setChoosedCategoryId: (value: string) => void;
}

export const Item: FC<ItemProps> = ({ dataItem, setIsEditCategoryModalActive, setChoosedCategoryId, setIsDeleteCategoryModalActive }) => {
    const date = getCurrentDate(dataItem.date);

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

    return (
        <Container id={dataItem.uid}>
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
                <Settings>
                    <Edit onClick={getEditModal}>
                        <FontAwesomeIcon icon={faPen} />
                    </Edit>
                    <button onClick={getDeleteModal}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </Settings>
            </TimeEditBlock>
        </Container>
    )
}