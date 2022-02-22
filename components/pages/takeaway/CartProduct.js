import React from 'react'
import { useDispatch } from 'react-redux'
import { useMenu, useTranslation } from 'app/hooks'

// Components
import { Icon } from 'components/ui/icon'
import config from 'app/config'



/**
 * TakeawayCartProduct
 */
 export default function CartProduct({ product }) {

    /** @const {Function} __ */
    const __ = useTranslation('pageTakeaway')

    /** @const {Object} menu */
    const menu = useMenu()

    /** @const {Object} dishesById  */
    const dishesById  = menu.getDishesById()
    
    /** @const {Function} dispatch */
    const dispatch = useDispatch()

    /**
     * Add a product into the cart
     * @param {{ id: Number, quantity: Number}} param
     */
    const addToCart = ({ id, quantity = 1}) => dispatch({type: 'takeaway/addToCart', payload: { id, quantity }})

    /**
     * Remove a product from the cart
     * @param {{ id: Number, quantity: Number}} param
     */
    const removeFromCart = ({ id, quantity = 1}) => dispatch({type: 'takeaway/removeFromCart', payload: { id, quantity }})

    /**
     * Render
     */
    return (
        <li className="list-item">
            <div className="quantity">
                <button
                    className="quantity-button"
                    onClick={() => removeFromCart({id: product.id})}
                >
                    <Icon name="minus" aria-hidden="true" />
                    <span className="sr-only">{__('minus')}</span>
                </button>
                <span className="quantity-counter">{product.quantity}</span>
                <button
                    className="quantity-button"
                    onClick={() => addToCart({id: product.id})}
                >
                    <Icon name="plus" aria-hidden="true" />
                    <span className="sr-only">{__('plus')}</span>
                </button>
            </div>
            <div className="product">
                {dishesById[product.id].name}
            </div>
            <div className="price">
                <div className="price-wrapper">
                    <span className="price-amount">
                        {(product.quantity * dishesById[product.id].price).toFixed(2)}{config.monetaryUnit}
                    </span>
                    <button
                        className="price-clear"
                        onClick={() => removeFromCart(product)}
                    >
                        <Icon name="times" aria-hidden="true" />
                        <span className="sr-only">{__('clear')}</span>
                    </button>
                </div>
            </div>
        </li>
    )
}