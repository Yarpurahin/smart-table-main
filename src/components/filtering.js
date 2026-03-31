import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes)                                    // Получаем ключи из объекта
      .forEach((elementName) => {                        // Перебираем по именам
        elements[elementName].append(                    // в каждый элемент добавляем опции
            ...Object.values(indexes[elementName])        // формируем массив имён, значений опций
                      .map(name => {
                        const option = document.createElement('option');
                        option.value = name;
                        option.textContent = name;
                        return option;
                    })
        )
     })

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        document.addEventListener('click', (e) => {
            const target = e.target;
            if (target.name === 'clear') {
                const parent = target.parentElement;
                const input = parent.querySelector('input');
                input.value = '';

                const field = target.dataset.field;
                state[field] = '';
            }
            });

        // @todo: #4.5 — отфильтровать данные используя компаратор
        const processedState = {...state};
        
        if (state.totalFrom || state.totalTo) {
            processedState.total = [
                state.totalFrom || '',
                state.totalTo || ''
            ];
            delete processedState.totalFrom;
            delete processedState.totalTo;
        }
        
        return data.filter(row => compare(row, processedState));
    }
}

