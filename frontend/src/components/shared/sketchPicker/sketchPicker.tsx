import { FC, useContext } from "react";
import { SketchPicker } from 'react-color';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { ColorState } from "../../ui/settingsPage/components/options/components/chart/chart";
import { ThemeContextType } from "../../../contexts/themeContext/types";
import { ThemeContext } from "../../../contexts/themeContext/themeContext";

interface SketchPickerComponentProps {
    isSketchPickerActive: boolean;
    setIsSketchPickerActive: (value: boolean) => void;
    handleSave: () => void;
    selectedColor: string;
    setColorState: (value: (prevState: ColorState) => ColorState) => void;
}

export const SketchPickerComponent: FC<SketchPickerComponentProps> = ({
    isSketchPickerActive, setIsSketchPickerActive, handleSave, selectedColor, setColorState }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    const handleColorChange = (color: string) => {
        setColorState((prev) => ({ ...prev, selectedColor: color }));
    };

    const buttonStyles = {
        backgroundColor: themeContext.themeStyles.buttonBackground,
        color: "#fff",
        padding: "6px 20px",

        '&:hover': {
            backgroundColor: themeContext.themeStyles.buttonBackgroundHover,
        }
    }

    const dialogStyles = {
        zIndex: 20,

        '& .MuiDialog-paper': {
            backgroundColor: themeContext.themeStyles.modalBackground,
        },
        '& .sketch-picker ': {
            backgroundColor: themeContext.themeStyles.modalBackground,
            boxShadow: "none",
        },
        '& .flexbox-fix > div > div label': {
            color: `${themeContext.themeStyles.color} !important`,
        },
        '& .flexbox-fix > div > div input': {
            width: `100% !important`,
        },
    }

    const dialogTitleStyles = {
        color: themeContext.themeStyles.color,
        padding: "16px 35px",
    }

    return (
        <>
            <Dialog
                sx={dialogStyles}
                open={isSketchPickerActive}
                onClose={() => setIsSketchPickerActive(false)}>
                <DialogTitle sx={dialogTitleStyles}>Customize Chart Colors</DialogTitle>
                <DialogContent>
                    <div style={{ marginBottom: '15px' }}>
                        <SketchPicker
                            styles={{
                                default: {
                                    picker: {
                                        backgroundColor: themeContext.themeStyles.modalBackground,
                                        boxShadow: 'none',
                                        width: "100%",
                                        maxWidth: "250px",
                                    },
                                    color: {
                                        boxShadow: '0px 0px 3px #fff',
                                    },
                                    alpha: {
                                        background: `linear-gradient(to right, rgba(0, 0, 0, 0) 0%, ${themeContext.themeStyles.color}`,
                                    },
                                },
                            }}
                            color={selectedColor}
                            onChangeComplete={(color) =>
                                handleColorChange(`rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`)} />
                    </div>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "space-between", padding: "0 35px 16px 35px" }}>
                    <Button sx={buttonStyles} onClick={() => setIsSketchPickerActive(false)}>Cancel</Button>
                    <Button sx={buttonStyles} onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}