







/**
 * @const initialState
 */
const initialState = {
    language: false,
}

/**
 * Translation reducer
 * @param {Object} state
 * @param {Object} action
 * @returns {Object}
 */
export default function translationReducer(state = initialState, action) {
    switch(action.type) {
        // Default
        default: {
            return state
        }
    }
}

/**
 * Layout selector
 * @param {Object} state
 * @returns {Object}
 */
export const translationSelector = (state) => ({...state.layoutReducer})
