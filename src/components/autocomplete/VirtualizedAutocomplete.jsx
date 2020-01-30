import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { FixedSizeList } from 'react-window';

function renderRow(props) {
    const { data, index, style } = props;

    return React.cloneElement(data[index], {
        style: {
            // overflow: 'hidden',
            // textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            display: 'block',
            ...style,
        },
    });
}

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
    const { children, ...other } = props;
    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up('sm'));
    const itemCount = Array.isArray(children) ? children.length : 0;
    const itemSize = smUp ? 36 : 48;

    const outerElementType = React.useMemo(() => {
        return React.forwardRef((props2, ref2) => <div ref={ref2} {...props2} {...other} />);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div ref={ref}>
            <FixedSizeList
                style={{ padding: 0, height: Math.min(8, itemCount) * itemSize, maxHeight: 'auto' }}
                itemData={children}
                height={250}
                width="100%"
                outerElementType={outerElementType}
                innerElementType="ul"
                itemSize={itemSize}
                overscanCount={5}
                itemCount={itemCount}
            >
                {renderRow}
            </FixedSizeList>
        </div>
    );
});

ListboxComponent.propTypes = {
    children: PropTypes.node,
};

const useStyles = makeStyles({
    listbox: {
        '& ul': {
            padding: 0,
            margin: 0,
        },
    },
});

export default function VirtualizedAutocomplete(props) {
    const classes = useStyles();
    const { label, variant, options, getOptionLabel, optionLabelAttr, style, value, onChange, filterOptions, disableClearable } = props

    return (
        <Autocomplete
            id={label}
            value={value}
            onChange={onChange}
            style={style ? style : { width: 300 }}
            disableClearable={disableClearable}
            getOptionLabel={getOptionLabel ? getOptionLabel : ((option) => option[optionLabelAttr])}
            disableListWrap
            classes={classes}
            ListboxComponent={ListboxComponent}
            options={options}
            renderInput={params => (
                <TextField {...params} label={label} variant={variant ? variant : "outlined"} fullWidth />
            )}
            filterOptions={filterOptions}
        />
    );
}
