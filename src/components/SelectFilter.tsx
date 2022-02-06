import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Continent, Currency } from '../context/CountriesContext';
import Select from 'react-select';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

type Props = {
  label: string;
  placeholder: string;
  items: Partial<Continent | Currency>[];
  handleChange: Function;
  loading?: boolean;
}

export default function SelectFilter({ loading, label, placeholder, items, handleChange }: Props) {
  return (
    <>
      <Select
        onChange={(value) => handleChange(null, value)}
        getOptionLabel={(option) => option.name!}
        getOptionValue={(option) => option.code!}
        isClearable
        isDisabled={loading}
        isLoading={loading}
        isMulti
        isSearchable
        styles={{
          container: (base) => ({ ...base, minWidth: 350 }),
        }}
        options={items}
        placeholder={placeholder}
      />

      {/* <Autocomplete
      multiple
      id={"SelectFilter" + label}
      options={items}
      disableCloseOnSelect
      loading={loading}
      onChange={(...args) => handleChange(...args)}
      getOptionLabel={(option) => option.name!}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
      style={{ minWidth: 350 }}
      renderInput={(params) => (
        <TextField {...params} placeholder={placeholder} />
      )}
    /> */}
    </>
  );
}