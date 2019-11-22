import React from 'react';
import TextField from '@material-ui/core/TextField';
import MUIAutocomplete from '@material-ui/lab/Autocomplete';

export default function Autocomplete(props) {
    const { label, variant, options, getOptionLabel, optionLabelAttr, style, value, onChange, filterOptions, disableClearable } = props
    return (
        <MUIAutocomplete
            id={label}
            value={value}
            onChange={onChange}
            options={options}
            getOptionLabel={getOptionLabel ? getOptionLabel : ((option) => option[optionLabelAttr])}
            style={style ? style : { width: 300 }}
            renderInput={params => (
                <TextField {...params} label={label} variant={variant ? variant : "outlined"} fullWidth />
            )}
            filterOptions={filterOptions}
            disableClearable={disableClearable}
        />
    );
}

