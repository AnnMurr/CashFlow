import { FC } from "react";
import { APPLE_STORE_ICON, GOOGLE_PLAY_ICON } from "../../../../../../../consts/images";
import { Link } from "react-router-dom";
import { MotionValue } from "framer-motion";
import { AppIconsWrap } from "./styledAppStoresBlock";

interface AppStoresBlockProps {
    styles: {
        [key: string]: string | MotionValue<number>;
    }
}

export const AppStoresBlock: FC<AppStoresBlockProps> = ({ styles }) => {
    return (
        <AppIconsWrap style={styles}>
            <Link to={"https://apps.apple.com"}>
                <img src={APPLE_STORE_ICON} alt="apple-store" />
            </Link>
            <Link to={"https://play.google.com/store/apps"}>
                <img src={GOOGLE_PLAY_ICON} alt="google-play" />
            </Link>
        </AppIconsWrap>
    )
}