import { useSelector } from "react-redux"
import { takeawaySelector, translationSelector } from "app/reducers"
import { useMenu, useTranslation } from "app/hooks"
import config from "app/config"

import { Icon } from "components/ui/icon"
import { zeroPad } from "app/helpers"


/**
 * Display step 4 : Review
 * @param {formData: Object} props
 */
export default function OrderReview({ formData }) {
    /** @const {Function} __ */
    const __ = useTranslation('pageTakeaway.order')
    const { currentLocale } = useSelector(translationSelector)

    /** @const {Array} cart */
    const { cart } = useSelector(takeawaySelector)

    /** @const {Object} menu */
    const menu = useMenu()

    /** @const {Object} dishesById */
    const dishesById  = menu.getDishesById()

    /**
     * Render
     */
    return (
        <>
            {/* Order */}
            <div className="heading">
                <div className="heading-icon">
                    <Icon name="file-invoice" />
                </div>
                <div className="heading-content">
                    <h2 className="heading-title">{__('check.title')}</h2>
                </div>
            </div>
            <ul className="confirmation-order">
                <li className="confirmation-order-info">
                    {__('review.date')}
                    {(new Date(formData.date)).toLocaleDateString(currentLocale, {
                        weekday: "long", year: "numeric", month: "long", day: "numeric"
                    })}
                    {__('review.date-at')}
                    {+(`${formData.time}`.slice(0,2)) + 'h' + zeroPad((60 / 100 * +(`${formData.time}`.slice(2,4))), 2)}
                </li>
                <li className="confirmation-order-info">
                    <h3 className="confirmation-title">{__('review.order-review')}</h3>
                    <ul className="confirmation-products">
                        {cart.map((product, index) => (
                            <li 
                                key={`order-review-cart-${index}`}
                                className="confirmation-product"
                            >
                                <div className="confirmation-product-quantity">
                                    {product.quantity}
                                </div>
                                <div className="confirmation-product-name">
                                    {dishesById[product.id].name}
                                </div>
                                <div className="confirmation-product-price">
                                    {(product.quantity * dishesById[product.id].price).toFixed(2)}{config.monetaryUnit}
                                </div>
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
            <div className="confirmation-total">
                {__('check.total')}
                {cart.reduce(
                    (total, product) => 
                        total + product.quantity * dishesById[product.id].price, 0).toFixed(2)
                }
                {config.monetaryUnit}
            </div>
        </>
    )
}