import { FC } from "react";
import { APPLE_STORE_ICON, GOOGLE_PLAY_ICON } from "../../../../../../../consts/images";
import { Link } from "react-router-dom";
import { MotionValue } from "framer-motion";
import { AppIconsWrap, Image } from "./styledAppStoresBlock";

interface AppStoresBlockProps {
    styles: {
        [key: string]: string | MotionValue<number>;
    }
}

export const AppStoresBlock: FC<AppStoresBlockProps> = ({ styles }) => {
    return (
        <AppIconsWrap style={styles}>
            <Link to={"https://apps.apple.com"}>
                <Image src={APPLE_STORE_ICON.default} alt="apple-store" />
            </Link>
            <Link to={"https://play.google.com/store/apps"}>
                <Image src={GOOGLE_PLAY_ICON.default} alt="google-play" />
            </Link>
        </AppIconsWrap>
    )
}