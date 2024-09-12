import { MouseEvent, useContext, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { INITIAL_CHARTS_COLORS } from "../../../../../../../../../consts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ThemeContextType } from '../../../../../../../../../contexts/themeContext/types';
import { ThemeContext } from '../../../../../../../../../contexts/themeContext/themeContext';
import { BtnAddInner, EditBlock, ItemInner } from './styledColorList';

interface ColorListProps {
    openColorModal: (event: MouseEvent<HTMLButtonElement>, isSketchPicker: boolean, isAdding: boolean) => void;
    list: Array<string> | null;
    btnAddClassName: string;
    chartType: string;
}

export const ColorList: React.FC<ColorListProps> = ({
    openColorModal, list, btnAddClassName, chartType }) => {
    const [currentColors, setCurrentColors] = useState<Array<string>>(INITIAL_CHARTS_COLORS);
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    useEffect(() => {
        list && setCurrentColors(list);
    }, [list]);

    return (
        <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
            {currentColors.map((color, index) => (
                <ItemInner
                    key={index}
                    color={color} >
                    <EditBlock>
                        <div>
                            <button data-type={chartType} data-color={color} onClick={(event) => openColorModal(event, true, false)}>
                                <FontAwesomeIcon size='xs' icon={faPen} />
                            </button>
                        </div>
                        <div>
                            <button data-type={chartType} data-color={color} onClick={(event) => openColorModal(event, false, false)}>
                                <FontAwesomeIcon size='xs' icon={faTrash} />
                            </button>
                        </div>
                    </EditBlock>
                </ItemInner>
            ))}
            <BtnAddInner themestyles={themeContext.themeStyles}>
                <button className={btnAddClassName} type='button' onClick={(event) => openColorModal(event, true, false)}>
                    <FontAwesomeIcon color={themeContext.themeStyles.color} icon={faPlus} />
                </button>
            </BtnAddInner>
        </Box>
    );
};