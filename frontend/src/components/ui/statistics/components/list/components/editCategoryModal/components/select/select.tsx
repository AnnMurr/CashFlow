import { FC, useState } from "react";
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { CategoriesType } from "../../../../../../../../../redux/reducers/userStorageReduser/types";
import { v4 as uuidv4 } from 'uuid';

interface MultipleSelectPlaceholderType {
  names: Array<CategoriesType> | null,
  categoryName: string,
  setCategoryName: (value: string) => void
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const MultipleSelectPlaceholder: FC<MultipleSelectPlaceholderType> = ({ names, categoryName, setCategoryName }) => {
  const theme = useTheme();
  const [category, setCategory] = useState<Array<string>>([]);

  const handleChange = (event: SelectChangeEvent<typeof category>) => {
    const { target: { value } } = event;
    setCategoryName(value.toString());
    setCategory(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: "100%", mt: 3, margin: "0 0 10px 0", marginTop: "10px" }}>
        <Select
          sx={{
            '& .MuiSelect-select': {
              padding: '10px',
            },
            '& em': {
              fontStyle: 'normal'
            }
          }}
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
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }} >
          {names && names.map((item) => (
            <MenuItem
              key={uuidv4()}
              value={item.name}
              style={getStyles(item.name, category, theme)}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}