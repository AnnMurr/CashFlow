import { FC } from "react";
import { FEATURES_CALENDAR_ICON, FEATURES_ANALYSIS_ICON, FEATURES_MULTI_DEVICE_ICON, FEATURES_LOCK_ICON } from "../../../../../../../../../consts/images";
import { ItemBlock } from "./components/itemBlock/itemBlock";
import { Container } from "./styledList";

export const List: FC = () => {
    return (
        <Container>
            <ul>
                <ItemBlock
                    type={"LeftBlock"}
                    link={FEATURES_CALENDAR_ICON}
                    titleText={"Improved Calendar Visuals"}
                    SubTitleText={"Review all your monthly transactions in one place"} />
                <ItemBlock
                    type={"LeftBlock"}
                    link={FEATURES_ANALYSIS_ICON}
                    titleText={"Personalized reports"}
                    SubTitleText={"Detailed analysis of expenses and income"} />
                <ItemBlock
                    type={"LeftBlock"}
                    link={FEATURES_MULTI_DEVICE_ICON}
                    titleText={"Multi-Device Sync"}
                    SubTitleText={"Access data from any device"} />
                <ItemBlock
                    type={"LeftBlock"}
                    link={FEATURES_LOCK_ICON}
                    titleText={"Data Security"}
                    SubTitleText={"Guaranteed protection of financial information"} />
            </ul>
            <ul>
                <ItemBlock
                    type={"RightBlock"}
                    link={FEATURES_CALENDAR_ICON}
                    titleText={"Improved Calendar Visuals"}
                    SubTitleText={"Review all your monthly transactions in one place"} />
                <ItemBlock
                    type={"RightBlock"}
                    link={FEATURES_ANALYSIS_ICON}
                    titleText={"Personalized reports"}
                    SubTitleText={"Detailed analysis of expenses and income"} />
                <ItemBlock
                    type={"RightBlock"}
                    link={FEATURES_MULTI_DEVICE_ICON}
                    titleText={"Multi-Device Sync"}
                    SubTitleText={"Access data from any device"} />
                <ItemBlock
                    type={"RightBlock"}
                    link={FEATURES_LOCK_ICON}
                    titleText={"Data Security"}
                    SubTitleText={"Guaranteed protection of financial information"} />
            </ul>
        </Container>
    )
}