import {rules, createComparison} from "../lib/compare.js";


export function initSearching(searchField) {
    // @todo: #5.1 — настроить компаратор
    const compare = createComparison(rules);

    return (data, state, action) => {
        // @todo: #5.2 — применить компаратор
        data.compare(rules.skipEmptyTargetValues, rules.searchMultipleFields (searchField, ['date', 'customer', 'seller'], false));
        return data;
    }
}