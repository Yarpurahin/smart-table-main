import {rules, createComparison} from "../lib/compare.js";

export function initSearching(searchField) {
    // @todo: #5.1 — настроить компаратор
    // Правила из ТЗ: нужен только skipEmptyTargetValues
    // Вторым аргументом подключаем правило searchMultipleFields
    const compare = createComparison(
        ['skipEmptyTargetValues'],  // Массив имен правил
        [                           // Массив кастомных правил
            rules.searchMultipleFields(searchField, ['date', 'customer', 'seller'], false)
        ]
    );
    
    return (data, state, action) => {
        // @todo: #5.2 — применить компаратор
        // Фильтруем данные: оставляем только те строки, которые проходят сравнение
        return data.filter(row => compare(row, state));
    }
}