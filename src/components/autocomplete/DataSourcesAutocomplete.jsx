
import React from 'react';
import Autocomplete from './DownshiftAutocomplete';
import { makeStyles } from '@material-ui/styles';
import { scanTable } from '../../graphql/queries/explore/general';

const useStyles = makeStyles({
    autocomplete: {
        position: 'relative',
        width: '30vw'
    }
})

/*
    Define the following in the parent component to use the autocomplete field:

    For state:
    const [selectedItem, setSelectedItem] = React.useState('')
    const [items, setItems] = React.useState([])

    To render:
    <DataSourcesAutocomplete
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        setItems={setItems} // if you want all the items accessible in the parent
    />
*/

export default function DataSourcesAutocomplete(props) {
    const classes = useStyles()
    const { selectedItem, setSelectedItem, setItems, onSelect } = props
    const [suggestions, setSuggestions] = React.useState([])

    React.useEffect(() => {
        const getDatasetItems = async () => {
            let items = await scanTable('data_sources')
            items = JSON.parse(JSON.parse(items))
            if (setItems) setItems(items)
            const suggestions = items.map(i => ({ label: i.name }))
            setSuggestions(suggestions)
        }
        getDatasetItems()
    }, [setItems])

    return (
        <Autocomplete
            label='Data Sources'
            placeholder='Select a data source...'
            suggestions={suggestions}
            onChange={selectedItem => {
                setSelectedItem(selectedItem)
                if (onSelect) onSelect(selectedItem)
            }}
            selectedItem={selectedItem}
            containerStyle={classes.autocomplete}
        />
    )
}
