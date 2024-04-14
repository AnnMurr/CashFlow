import { FC } from "react";
import { APPLE_STORE_ICON, GOOGLE_PLAY_ICON } from "../../../../../../../consts/images";
import { Link } from "react-router-dom";
import { AppIconsWrap } from "./styledAppStoresBlock";

export const AppStoresBlock: FC = () => {
    return (
        <AppIconsWrap>
            <Link to={"https://apps.apple.com"}>
                <img src={APPLE_STORE_ICON} alt="apple-store" />
            </Link>
            <Link to={"https://play.google.com/store/apps"}>
                <img src={GOOGLE_PLAY_ICON} alt="google-play" />
            </Link>
        </AppIconsWrap>
    )
}