// import {createComparison, defaultRules} from "../lib/compare.js";

// // @todo: #4.3 — настроить компаратор
// const compare = createComparison(defaultRules);

// export function initFiltering(elements, indexes) {
//     // @todo: #4.1 — заполнить выпадающие списки опциями
//     Object.keys(indexes)                                    // Получаем ключи из объекта
//       .forEach((elementName) => {                        // Перебираем по именам
//         elements[elementName].append(                    // в каждый элемент добавляем опции
//             ...Object.values(indexes[elementName])        // формируем массив имён, значений опций
//                       .map(name => {
//                         const option = document.createElement('option');
//                         option.value = name;
//                         option.textContent = name;
//                         console.log(option);
//                         return option;
//                     })
//         )
//      })

//     return (data, state, action) => {
//         // @todo: #4.2 — обработать очистку поля
//         document.addEventListener('click', (e) => {
//             const target = e.target;
//             if (target.name === 'clear') {
//                 const parent = target.parentElement;
//                 const input = parent.querySelector('input');
//                 input.value = '';

//                 const field = target.dataset.field;
//                 state[field] = '';
//             }
//             });

//         // @todo: #4.5 — отфильтровать данные используя компаратор
//         return data.filter(row => compare(row, state));
//     }
// }

import {createComparison, rules} from "../lib/compare.js";

export function initFiltering(elements, indexes) {
    // @todo: #4.3 — настроить компаратор
    const compare = createComparison([
        'skipNonExistentSourceFields',
        'skipEmptyTargetValues',
        'arrayAsRange'
    ]);
    
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes).forEach((elementName) => {
        if (!elements[elementName]) return;
        
        elements[elementName].append(
            ...Object.values(indexes[elementName]).map(name => {
                const option = document.createElement('option');
                option.value = name;
                option.textContent = name;
                return option;
            })
        )
    });
    
    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === 'clear') {
            const parent = action.parentElement;
            const input = parent.querySelector('input');
            
            if (input) {
                input.value = '';
                const field = action.dataset.field;
                if (field) {
                    state[field] = '';
                }
            }
        }
        
        // Подготавливаем state для сравнения
        const processedState = {...state};
        
        // Преобразуем totalFrom и totalTo в массив для arrayAsRange
        if (state.totalFrom || state.totalTo) {
            processedState.total = [
                state.totalFrom || '',
                state.totalTo || ''
            ];
            delete processedState.totalFrom;
            delete processedState.totalTo;
        }
        
        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, processedState));
    }
}