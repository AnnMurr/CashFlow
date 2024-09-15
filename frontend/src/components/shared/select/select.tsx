import { FC, useContext, useState } from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { CategoriesType } from "../../../redux/reducers/userStorageReduser/types";
import { CurrencyNameAndCode } from "../../../api/getCurrencyCodes/types";
import { v4 as uuidv4 } from 'uuid';
import { ThemeContextType } from "../../../contexts/themeContext/types";
import { ThemeContext } from "../../../contexts/themeContext/themeContext";

interface MultipleSelectPlaceholderType {
  names: Array<CategoriesType> | Array<string> | Array<CurrencyNameAndCode> | null;
  categoryName: string | null;
  setCategoryName: (value: string) => void;
  isDisabled: boolean;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export const MultipleSelectPlaceholder: FC<MultipleSelectPlaceholderType> = ({ names, categoryName, setCategoryName, isDisabled }) => {
  const [category, setCategory] = useState<Array<string>>([]);
  const themeContext = useContext<ThemeContextType>(ThemeContext);

  const handleChange = (event: SelectChangeEvent<typeof category>) => {
    const { target: { value } } = event;
    setCategoryName(value.toString());
    setCategory(typeof value === 'string' ? value.split(',') : value);
  };

  const formControlStyles = {
    m: 1,
    width: "100%",
    mt: 3,
    margin: 0,
    marginTop: 0,

    '& .MuiPaper-root.MuiPopover-paper.MuiMenu-paper': {
      backgroundColor: themeContext.themeStyles.modalBackground,
    },
  }

  const selectStyles = {
    color: themeContext.themeStyles.color,

    '& .MuiSelect-select': {
      padding: "8.5px 14px",
      fontSize: "14px",
    },
    '& em': {
      fontStyle: 'normal'
    },
    '& .MuiSvgIcon-root': {
      color: themeContext.themeStyles.dataPikerIcon,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: themeContext.themeStyles.inputBorder,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: isDisabled ? "none" : themeContext.themeStyles.inputBorderHover,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: themeContext.themeStyles.inputBorderFocused,
    },
    '& .MuiSelect-menu': {
      backgroundColor: "red",
    },
    '& .MuiOutlinedInput-input.Mui-disabled': {
      color: themeContext.themeStyles.multipleSelectPlaceholderDisabledColor,
      WebkitTextFillColor: themeContext.themeStyles.multipleSelectPlaceholderDisabledColor
    },
    '&.MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
      borderColor: themeContext.themeStyles.multipleSelectPlaceholderDisabledBorder,
    },
  };

  const menuItemStyles = {
    '&.MuiButtonBase-root.MuiMenuItem-root.Mui-selected': {
      backgroundColor: themeContext.themeStyles.selectSelected,
    },
    '&:hover': {
      backgroundColor: themeContext.themeStyles.selectHover,
    }
  };

  return (
    <div>
      <FormControl sx={formControlStyles}>
        <Select
          disabled={isDisabled}
          sx={selectStyles}
          displayEmpty
          value={category}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>{categoryName}</em>
            }
            return selected.join(', ');
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
                backgroundColor: themeContext.themeStyles.datePikerLayout,
                color: themeContext.themeStyles.color,
              },
            },
          }}
          inputProps={{ 'aria-label': 'Without label' }} >
          {names && names.map((item) => {
            const itemName = typeof item === 'string' ? item : item.name.toString();

            return (
              <MenuItem
                key={uuidv4()}
                value={itemName}
                sx={menuItemStyles}
              >
                {itemName}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </div>
  );
}