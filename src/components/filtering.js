import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes)                                    
      .forEach((elementName) => {                        
        elements[elementName].append(                    
            ...Object.values(indexes[elementName])        
                      .map(name => {                       
                        const newOption = document.createElement('option');
                        newOption.textContent = name;
                        newOption.value = name;
                        return newOption;                               
                      })
        )
     })

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
         if (action && action.name === 'clear') {
            const field = action.dataset.field;
            
            if (field) {
                
                const input = elements[field] || 
                             document.querySelector(`[name="${field}"]`);
                
                if (input) {
                    if (input.tagName === 'SELECT') {
                        input.value = '';
                    } else {
                        input.value = '';
                    }
                }
                
                
                if (field in state) {
                    state[field] = '';
                }
            }
        }

        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
        
    }
}