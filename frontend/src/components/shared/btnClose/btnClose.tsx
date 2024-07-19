import { FC } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { BtnInner } from "./styledBtnClose";
import { addScroll } from "../../../utils/toggleScroll";

interface BtnCloseProps {
    closeBlock: (value: boolean) => void;
    color: string;
    size: SizeProp;
    btnInnerstyles?: React.CSSProperties
}

export const BtnClose: FC<BtnCloseProps> = ({ closeBlock, color, size, btnInnerstyles }) => {
    return (
        <BtnInner style={btnInnerstyles}>
            <button onClick={() => {
                addScroll()
                closeBlock(false)
            }}>
                <FontAwesomeIcon color={color} size={size} icon={faXmark} />
            </button>
        </BtnInner>
    )
}