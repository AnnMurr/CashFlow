import { FC } from "react";
import { IPHONE_TRANSPARENT } from "../../../../../../../consts/images";
import { LOGO } from "../../../../../../../consts/images";
import { IconInner, ImageInner } from "./styledPhoneImage";

export const PhoneImage: FC = () => {
    return (
        <ImageInner>
            <img src={IPHONE_TRANSPARENT} alt="iphone" />
            <IconInner>
                <img src={LOGO.default} alt="logo" />
            </IconInner>
        </ImageInner>
    )
}