import { FC } from "react";
import { getCurrentDate } from "../../../../../../../utils/getCurrentDate";
import { ItemType } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Container, Edit, IconInner, TimeEditBlock } from "./styledItem";
interface ItemProps {
    dataItem: ItemType;
}

export const Item: FC<ItemProps> = ({ dataItem }) => {
    const date = getCurrentDate(dataItem.date);

    const getEditModal = (event: any) => {
        console.log(event.currentTarget.parentNode.parentNode.id)
    }

    console.log("dataItem.uuid", dataItem)

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

                <Edit onClick={getEditModal}>
                    <FontAwesomeIcon icon={faEdit} />
                </Edit>
            </TimeEditBlock>
        </Container>
    )
}