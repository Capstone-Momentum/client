import { GRAPHQL_ROUTE } from '../constants';

export function executeGraphql(query) {
    return fetch(GRAPHQL_ROUTE, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ "query": query })
    })
        .then(r => r.json())
}