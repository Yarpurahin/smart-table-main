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

import {createComparison, defaultRules} from "../lib/compare.js";

export function initFiltering(elements, indexes) {
    // Создаем компаратор
    const compare = createComparison(defaultRules);
    
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes).forEach((elementName) => {
        const element = elements[elementName];
        if (!element) return; // Проверяем существование элемента
        
        // Очищаем существующие опции
        element.innerHTML = '';
        
        // Добавляем опцию по умолчанию (опционально)
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Все';
        element.appendChild(defaultOption);
        
        // Добавляем опции из индексов
        const options = Object.values(indexes[elementName]).map(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            return option;
        });
        
        element.append(...options);
    });
    
    // Обработчик очистки полей
    document.addEventListener('click', (e) => {
        const target = e.target;
        if (target.name === 'clear') {
            const parent = target.parentElement;
            // Ищем поле ввода или select
            const fieldElement = parent.querySelector('input, select');
            if (fieldElement) {
                fieldElement.value = '';
                
                const field = target.dataset.field;
                // Обновляем state через событие
                if (field) {
                    const changeEvent = new Event('change', { bubbles: true });
                    fieldElement.dispatchEvent(changeEvent);
                }
            }
        }
    });
    
    return (data, state, action) => {
        // Применяем фильтрацию
        return data.filter(row => compare(row, state));
    }
}