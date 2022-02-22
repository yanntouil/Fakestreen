import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { takeawaySelector } from 'app/reducers'
import { useMenu, useTranslation } from 'app/hooks'
import { TakeawayContext } from 'app/context'

// Components
import CartProduct from "./CartProduct"

// Icons
import ShoppingBagSvg from 'assets/images/icons/shopping-bag.svg'

/**
 * TakeawayCart
 */
export default function Cart() {

    /** @const {Function} __ */
    const __ = useTranslation('pageTakeaway')

    /** @const {Array} cart */
    const { cart } = useSelector(takeawaySelector)

    /** @const {Object} menu */
    const menu = useMenu()

    /** @const {Object} dishesById  */
    const dishesById  = menu.getDishesById()

    /** @const {{viewer: Object|false, setViewer: Function}} context */
    const { setOrder } = useContext(TakeawayContext)
   
    /**
     * Render
     */
    return (
        <div className="takeaway-cart">
            {/* Cart heading */}
            <div className="heading">
                <div className="heading-icon">
                    <ShoppingBagSvg aria-hidden="true" />
                </div>
                <h2 className="heading-title">
                    {__('cart')}
                </h2>
                {cart.length > 0 && (
                    <div className="heading-counter">
                        {__('product', { count: cart.reduce((count, product) => count + product.quantity, 0) })}
                    </div>
                )}
            </div>
            {/* Cart list */}
            {cart.length > 0 && (
                <ul className="list">
                    {cart.map((product, index) => (
                        <CartProduct
                            key={`takeaway-cart-${index}`} 
                            { ...{ product } }
                        />
                    ))}
                </ul>
            )}
            {/* Cart order */}
            <div className="order">
                {cart.length > 0 ? (
                    <>
                        <button 
                            className="order-button"
                            onClick={() => setOrder(true)}
                        >
                            {__('order')}
                        </button>
                        <div className="order-amount">
                            {__('total')} : {cart.reduce((total, product) => total + product.quantity * dishesById[product.id].price, 0).toFixed(2)}€
                        </div>
                    </>
                ) : (
                    <div className="order-empty">{__('empty')}</div>
                )}
            </div>
        </div>
    )
}