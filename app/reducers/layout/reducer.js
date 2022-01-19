







/**
 * @const initialState
 */
const initialState = {
    menu: false,
}

/**
 * Layout reducer
 * @param {Object} state
 * @param {Object} action
 * @returns {Object}
 */
export default function layoutReducer(state = initialState, action) {
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
export const layoutSelector = (state) => ({...state.layoutReducer})
