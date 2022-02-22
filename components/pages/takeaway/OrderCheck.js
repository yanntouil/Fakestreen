import { useSelector } from 'react-redux'
import { takeawaySelector } from 'app/reducers'
import { useMenu, useTranslation } from 'app/hooks'
import config from 'app/config'

// Components
import { Icon } from 'components/ui/icon'
import CartProduct from './CartProduct'
import { useEffect } from 'react'

/**
 * Display step 1 : Check order
 */
 export default function OrderCheck({ setValidity }) {
    /** @const {Function} __ */
    const __ = useTranslation('pageTakeaway.order.check')

    /** @const {Array} takeawayReduxState */
    const { cart } = useSelector(takeawaySelector)

    /** @const {Object} menu */
    const menu = useMenu()

    /** @const {Object} dishesById  */
    const dishesById  = menu.getDishesById()

    /**
     * Watch on cart to check validity
     */
    useEffect(() => {
        setValidity(cart.lenght > 0)
    }, [cart, setValidity])

    /**
     * Render
     */
    return (
        <>
            {/* Heading */}
            <div className="heading">
                <div className="heading-icon">
                    <Icon name="file-invoice" />
                </div>
                <div className="heading-content">
                    <h2 className="heading-title">{__('title')}</h2>
                    <p className="heading-secondary">{__('secondary')}</p>
                </div>
            </div>
            {/* Cart or empty message */}
            {cart.length > 0 ? (
                <div className="cart">
                    {/* Products */}
                    <ul className="list">
                        {cart.map((product, index) => (
                            <CartProduct
                                key={`takeaway-validation-cart-${index}`} 
                                { ...{ product } }
                            />
                        ))}
                    </ul>
                    {/* Total */}
                    <div className="total">
                        {__('total')}
                        {cart.reduce(
                            (total, product) => 
                                total + product.quantity * dishesById[product.id].price, 0).toFixed(2)
                        }
                        {config.monetaryUnit}
                    </div>
                </div>
            ) : (
                <div className="cart-empty">{__('cart-empty')}</div>
            )}
        </>
    )
}
