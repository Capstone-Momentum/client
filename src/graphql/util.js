import { GRAPHQL_ROUTE } from '../constants';

export function executeGraphql(command, requestType) {
    return fetch(GRAPHQL_ROUTE, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ query: `${requestType} { ${command} }` })
    })
        .then(r => r.json())
}

export function graphqlQuery(queryString) {
    return executeGraphql(queryString, 'query')
}

export function graphqlMutation(mutationString) {
    return executeGraphql(mutationString, 'mutation')
}

