



/**
 * @const initialState
 */
 const initialState = {
    cart: [],
}

/**
 * Takeaway reducer
 * @param {Object} state
 * @param {Object} action
 * @returns {Object}
 */
export default function takeawayReducer(state = initialState, action) {
    switch(action.type) {
        // addToCart
        case 'takeaway/addToCart': {
            const cart = [...state.cart]
            const { id, quantity } = action.payload
            const index = cart.findIndex((product) => product.id === id)// Check if allready here
            if (index > -1) cart[index].quantity = cart[index].quantity + quantity// Here add quantity
            else cart.push({id, quantity})// Not here add new product
            return {...state, cart}
        }
        // removeFromCart
        case 'takeaway/removeFromCart': {
            const cart = [...state.cart]
            const { id, quantity } = action.payload
            const index = cart.findIndex((product) => product.id === id)
            if (index === -1) return state
            cart[index].quantity = cart[index].quantity - quantity
            if (cart[index].quantity <= 0) cart.splice(index, 1)
            return {...state, cart}
        }
        // Default
        default: {
            return state
        }
    }
}

/**
 * Takeaway selector
 * @param {Object} state
 * @returns {Object}
 */
export const takeawaySelector = (state) => ({...state.takeawayReducer})
