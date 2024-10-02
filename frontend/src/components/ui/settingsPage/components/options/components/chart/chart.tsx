import { FC, MouseEvent, useCallback, useEffect, useState } from "react";
import { faChartBar, faPieChart } from "@fortawesome/free-solid-svg-icons";
import { getDataFromLocalStorage } from "../../../../../../../storage/localStorage/localStorage";
import { RootState } from "../../../../../../../redux/reducers/userStorageReduser/types";
import { changeUserData } from "../../../../../../../redux/reducers/userStorageReduser/userStorageReduser";
import { useAppDispatch, useAppSelector } from "../../../../../../../redux/store/store";
import { showAlert } from "../../../../../../../utils/showAlert";
import { AlertComponentProps } from "../../../../../../shared/alert/alert";
import { getOpacityFromRgba } from "../../../../../../../utils/getOpacityFromRgba";
import { ColorList, DarkBackground, DeleteColorModal, Name, SketchPickerComponent, AlertComponent } from ".";
import { Block, Container } from "./styledChart";

export interface ColorState {
    selectedColor: string;
    choosenColor: string | null;
    chosenChart: "pieChartColor" | "barChartColor" | null;
}
export interface CurrentColors {
    pieChartColor: Array<string>;
    barChartColor: Array<string>;
}

export const ChartSettings: FC = () => {
    const [isSketchPickerActive, setIsSketchPickerActive] = useState<boolean>(false);
    const [isDeleteColorModalActive, setIsDeleteColorModalActive] = useState<boolean>(false);
    const [currentColors, setCurrentColors] = useState<CurrentColors | null>(null);
    const [isAlertActive, setIsAlertActive] = useState<AlertComponentProps | null>(null);
    const [colorState, setColorState] = useState<ColorState>({
        selectedColor: "",
        choosenColor: null,
        chosenChart: null
    });

    const { storageData } = useAppSelector((state: RootState) => state.storage);
    const dispatch = useAppDispatch();

    const updateChartColors = async (updatedColors: string[], successMessage: string) => {
        if (!colorState.chosenChart) return;
        const token = getDataFromLocalStorage("token");

        if (storageData) {
            try {
                const updatedData = {
                    ...storageData,
                    settings: {
                        ...storageData.settings,
                        charts: {
                            ...storageData.settings.charts,
                            [colorState.chosenChart]: updatedColors
                        }
                    }
                };

                const userDataAfterUpdate = (await dispatch(changeUserData({ userToken: token, updatedData: updatedData }))).payload;

                if (userDataAfterUpdate) {
                    showAlert({ type: "success", text: successMessage }, setIsAlertActive, 3000);
                    setIsSketchPickerActive(false);
                    setColorState((prev) => ({ ...prev, choosenColor: null }));
                }
            } catch (error) {
                showAlert({ type: "error", text: "Please try again later" }, setIsAlertActive, 3000);
                console.error(error);
            }
        }
    }

    const handleSave = useCallback(async () => {
        if (!colorState.chosenChart) return;

        const chartColors = storageData && storageData.settings.charts[colorState.chosenChart];

        const isColorExist = chartColors?.includes(colorState.selectedColor);
        const isTransparentColorExist = getOpacityFromRgba(colorState.selectedColor) === 0 ? chartColors?.find(color => getOpacityFromRgba(color) == 0) : null;

        if (isColorExist || isTransparentColorExist) {
            showAlert({ type: "warning", text: "This color already exists. Please choose a different color" }, setIsAlertActive, 3000);
            return
        }

        if (chartColors) {
            const updatedColors = colorState.choosenColor
                ? chartColors?.map((color) => color === colorState.choosenColor ? colorState.selectedColor : color)
                : [...chartColors, colorState.selectedColor];

            await updateChartColors(updatedColors, "Color changed successfully");
        }
    }, [colorState.chosenChart, colorState.choosenColor, colorState.selectedColor]);

    const handleDeleteColor = async () => {
        if (!colorState.chosenChart) return;

        if (storageData) {
            const chartColors = storageData && storageData.settings.charts[colorState.chosenChart];
            const categoriesLength = Math.max(storageData.data.categoriesExpenses.length, storageData.data.categoriesIncome.length);

            if (chartColors && categoriesLength) {
                if (chartColors.length <= categoriesLength) {
                    showAlert({ type: "warning", text: "The number of colors must be greater than or equal to the number of categories" }, setIsAlertActive, 3000);
                    setColorState((prev) => ({ ...prev, choosenColor: null }));
                } else if (storageData.settings.charts[colorState.chosenChart].length === 1) {
                    showAlert({ type: "warning", text: "You must retain at least one color" }, setIsAlertActive, 3000);
                    setColorState((prev) => ({ ...prev, choosenColor: null }));
                } else {
                    const updatedColors = chartColors.filter((color) => color !== colorState.choosenColor);

                    await updateChartColors(updatedColors, "Color deleted successfully");
                    setIsDeleteColorModalActive(false);
                }
            }
        }
    }

    const openColorModal = (event: MouseEvent<HTMLButtonElement>, isSketchPicker: boolean, isAdding: boolean = false) => {
        const chartType = event.currentTarget.dataset.type === "pie" || event.currentTarget.classList.contains("pie-chart__btn_add") ? "pieChartColor" : "barChartColor";
        const color = isAdding ? null : event.currentTarget.dataset.color || '';

        setColorState((prev) => ({ ...prev, chosenChart: chartType }));
        setColorState((prev) => ({ ...prev, choosenColor: color }));

        if (isSketchPicker) {
            setIsSketchPickerActive(true);
        } else {
            setIsDeleteColorModalActive(true);
        }
    }

    useEffect(() => {
        storageData && setCurrentColors({
            pieChartColor: storageData.settings.charts.pieChartColor,
            barChartColor: storageData.settings.charts.barChartColor
        })
    }, [storageData]);

    return (
        <Container>
            <Block className="pie-chart">
                <Name icon={faPieChart} text={"PieChart"} />
                {storageData &&
                    <ColorList
                        openColorModal={openColorModal}
                        btnAddClassName={"pie-chart__btn_add"}
                        chartType={"pie"}
                        list={currentColors ? currentColors.pieChartColor : null} />}
                <SketchPickerComponent
                    isSketchPickerActive={isSketchPickerActive}
                    setIsSketchPickerActive={setIsSketchPickerActive}
                    handleSave={handleSave}
                    selectedColor={colorState.selectedColor}
                    setColorState={setColorState} />
            </Block>
            <Block className="bar-chart">
                <Name icon={faChartBar} text={"BarChart"} />
                {storageData &&
                    <ColorList
                        openColorModal={openColorModal}
                        btnAddClassName={"bar-chart__btn_add"}
                        chartType={"bar"}
                        list={currentColors ? currentColors.barChartColor : null} />}
                <SketchPickerComponent
                    isSketchPickerActive={isSketchPickerActive}
                    setIsSketchPickerActive={setIsSketchPickerActive}
                    handleSave={handleSave}
                    selectedColor={colorState.selectedColor}
                    setColorState={setColorState} />
            </Block>
            {isDeleteColorModalActive ?
                <>
                    <DeleteColorModal
                        closeModal={setIsDeleteColorModalActive}
                        handleDeleteColor={handleDeleteColor} />
                    <DarkBackground
                        setIsModalActive={setIsDeleteColorModalActive}
                        isModalActive={isDeleteColorModalActive} />
                </>
                : null}
            {isAlertActive ? <AlertComponent type={isAlertActive.type} text={isAlertActive.text} /> : null}
        </Container>
    )
}