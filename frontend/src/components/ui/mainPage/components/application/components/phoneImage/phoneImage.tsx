import { FC } from "react";
import { IPHONE_TRANSPARENT } from "../../../../../../../consts/images";
import { CORIANDER_LOGO } from "../../../../../../../consts/images";
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
                <img src={CORIANDER_LOGO.default} alt="logo" />
            </IconInner>
        </ImageInner>
    )
}