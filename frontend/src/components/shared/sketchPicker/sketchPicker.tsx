import { FC } from "react";
import { SketchPicker } from 'react-color';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { ColorState } from "../../ui/settingsPage/components/options/components/chart/chart";

interface SketchPickerComponentProps {
    isSketchPickerActive: boolean;
    setIsSketchPickerActive: (value: boolean) => void;
    handleSave: () => void;
    selectedColor: string;
    setColorState: (value: (prevState: ColorState) => ColorState) => void;
}

export const SketchPickerComponent: FC<SketchPickerComponentProps> = ({
    isSketchPickerActive, setIsSketchPickerActive, handleSave, selectedColor, setColorState }) => {
    const handleColorChange = (color: string) => {
        setColorState((prev) => ({ ...prev, selectedColor: color }));
    };

    return (
        <>
            <Dialog open={isSketchPickerActive} onClose={() => setIsSketchPickerActive(false)}>
                <DialogTitle>Customize Chart Colors</DialogTitle>
                <DialogContent>
                    <div style={{ marginBottom: '15px' }}>
                        <SketchPicker
                            color={selectedColor}
                            onChangeComplete={(color) => handleColorChange(color.hex)} />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsSketchPickerActive(false)}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}