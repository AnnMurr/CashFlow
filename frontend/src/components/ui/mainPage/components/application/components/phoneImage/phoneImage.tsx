import { FC } from "react";
import { IPHONE_TRANSPARENT, LOGO_BLACK } from "../../../../../../../consts/images";
import { MotionValue } from "framer-motion";
import { IconInner, ImageInner } from "./styledPhoneImage";

interface PhoneImageProps {
    styles: {
        [key: string]: string | MotionValue<number>;
    }
}

export const PhoneImage: FC<PhoneImageProps> = ({ styles }) => {
    return (
        <ImageInner style={styles}>
            <img src={IPHONE_TRANSPARENT} alt="iphone" />
            <IconInner>
                <img src={LOGO_BLACK.default} alt="logo" />
            </IconInner>
        </ImageInner>
    )
}