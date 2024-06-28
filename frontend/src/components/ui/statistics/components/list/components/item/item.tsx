import { FC, useEffect, useRef, useState } from "react";
import { getCurrentDate } from "../../../../../../../utils/getCurrentDate";
import { ItemType } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faEllipsisVertical, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Container, Edit, Ellips, IconInner, Settings, TimeEditBlock } from "./styledItem";
interface ItemProps {
    dataItem: ItemType;
    setIsEditCategoryModalActive: (value: boolean) => void;
    setChoosedCategoryId: (value: string) => void;
}

export const Item: FC<ItemProps> = ({ dataItem, setIsEditCategoryModalActive, setChoosedCategoryId }) => {
    const settingsRef = useRef(null);
    const ellipsRef = useRef<HTMLButtonElement>(null);
    const [isSettingsActive, setIsSettingsActive] = useState(false);
    const date = getCurrentDate(dataItem.date);

    const getEditModal = (event: any) => {
        setChoosedCategoryId(event.currentTarget.parentNode.parentNode.id);
        setIsEditCategoryModalActive(true);
    }

    const openSettings = (event: any) => {
      console.log("dfad",event.currentTarget);
        setIsSettingsActive(true);
        // settingsRef.current && settingsRef.current.style.display = "block";
    }

    useEffect(() => {
        // const hideSettings = (event: MouseEvent) => {
     
        //     if(settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        //         console.log("hideSettings", event.target)
        //         setIsSettingsActive(false);
        //     }
        // }

        // isSettingsActive ?
        // window.addEventListener("click", hideSettings) :
        // window.removeEventListener("click", hideSettings) 
        
    }, [isSettingsActive])

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

          {isSettingsActive ?      <Settings ref={settingsRef}>
                    <Edit onClick={getEditModal}>
                        <FontAwesomeIcon icon={faPen} />
                    </Edit>
                    <div onClick={getEditModal}>
                        <FontAwesomeIcon icon={faTrash} />
                    </div>
                </Settings> : null}


{!isSettingsActive ?
                <Ellips onClick={openSettings} ref={ellipsRef}>
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                </Ellips> : null}
            </TimeEditBlock>
        </Container>
    )
}