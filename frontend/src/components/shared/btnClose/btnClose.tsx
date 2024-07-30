import { FC, useContext } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { addScroll } from "../../../utils/toggleScroll";
import { ThemeContextType } from "../../../contexts/themeContext/types";
import { ThemeContext } from "../../../contexts/themeContext/themeContext";
import { BtnInner } from "./styledBtnClose";

interface BtnCloseProps {
    closeBlock: (value: boolean) => void;
    color?: string;
    size: SizeProp;
    btnInnerstyles?: React.CSSProperties
}

export const BtnClose: FC<BtnCloseProps> = ({ closeBlock, color, size, btnInnerstyles }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    return (
        <BtnInner style={btnInnerstyles}>
            <button onClick={() => {
                addScroll()
                closeBlock(false)
            }}>
                <FontAwesomeIcon color={color ? color : themeContext.themeStyles.color} size={size} icon={faXmark} />
            </button>
        </BtnInner>
    )
}