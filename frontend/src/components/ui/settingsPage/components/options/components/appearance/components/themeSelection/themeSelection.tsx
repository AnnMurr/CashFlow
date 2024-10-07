import { FC } from "react";
import { CommentSkeleton } from "../../../../../../../../shared/commentSkeleton/commentSkeleton";
import { Themes } from "../../../../../../../../../contexts/themeContext/themes";
import RadioGroup from '@mui/joy/RadioGroup';
import { RadioComponent } from "./components/radioComponent/radioComponent";
import { useAppSelector } from "../../../../../../../../../redux/store/store";
import { RootState } from "../../../../../../../../../redux/reducers/userStorageReduser/types";
import { Wrapper } from "./styledThemeSelection";

export const ThemeSelection: FC = () => {
    const { storageData } = useAppSelector((state: RootState) => state.storage);

    return (
        <Wrapper>
            <RadioGroup
                defaultValue="medium"
                name="radio-buttons-group"
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: 2,
                    "@media screen and (max-width: 580px)": {
                        display: "flex",
                        gap: "15px",
                    },
                    '& .Mui-checked': {
                        border: '3px solid',
                        borderColor: 'primary.main',
                    },
                    '& .MuiRadio-root': {
                        display: 'contents',
                        '& > svg': {
                            zIndex: 2,
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            backgroundColor: 'background.paper',
                            borderRadius: '50%',
                        },
                    },
                }} >
                <RadioComponent
                    checked={storageData?.settings.theme === "light"}
                    value={"Light"}>
                    <CommentSkeleton
                        subBarColor={Themes.light.subBarBackground}
                        boxColor={Themes.light.settingsBackground}
                        color={Themes.light.color}
                        lineColor={Themes.light.statisticsLineDayBackground}
                        darkColor={Themes.light.buttonBackgroundHover}
                        bodyColor={Themes.light.body} />
                </RadioComponent>
                <RadioComponent
                    checked={storageData?.settings.theme === "dark"}
                    value={"Dark"}>
                    <CommentSkeleton
                        subBarColor={Themes.dark.subBarBackground}
                        boxColor={Themes.dark.settingsBackground}
                        color={Themes.dark.color}
                        lineColor={Themes.dark.statisticsLineDayBackground}
                        darkColor={Themes.dark.buttonBackgroundHover}
                        bodyColor={Themes.dark.body} />
                </RadioComponent>
                <RadioComponent
                    checked={storageData?.settings.theme === "green"}
                    value={"Green"}>
                    <CommentSkeleton
                        subBarColor={Themes.green.subBarBackground}
                        boxColor={Themes.green.settingsBackground}
                        color={Themes.green.color}
                        lineColor={Themes.green.statisticsLineDayBackground}
                        darkColor={Themes.green.buttonBackgroundHover}
                        bodyColor={Themes.green.body} />
                </RadioComponent>
                <RadioComponent
                    checked={storageData?.settings.theme === "sandstone"}
                    value={"Sandstone"}>
                    <CommentSkeleton
                        subBarColor={Themes.sandstone.subBarBackground}
                        boxColor={Themes.sandstone.settingsBackground}
                        color={Themes.sandstone.color}
                        lineColor={Themes.sandstone.statisticsLineDayBackground}
                        darkColor={Themes.sandstone.buttonBackgroundHover}
                        bodyColor={Themes.sandstone.body} />
                </RadioComponent>
                <RadioComponent
                    checked={storageData?.settings.theme === "gray"}
                    value={"Gray"}>
                    <CommentSkeleton
                        subBarColor={Themes.gray.subBarBackground}
                        boxColor={Themes.gray.settingsBackground}
                        color={Themes.gray.color}
                        lineColor={Themes.gray.statisticsLineDayBackground}
                        darkColor={Themes.gray.buttonBackgroundHover}
                        bodyColor={Themes.gray.body} />
                </RadioComponent>
            </RadioGroup>
        </Wrapper>
    )
}