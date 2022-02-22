import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import { useTranslation } from 'app/hooks'
import { TakeawayContext } from 'app/context'

// Icons
import PlusSvg from 'assets/images/icons/plus.svg'

/**
 * 
 */
export default function Dish({ dish }) {
    const product = dish

    /** @const {Function} __ */
    const __ = useTranslation('pageTakeaway')

    /** @const {Function} dispatch */
    const dispatch = useDispatch()

    /**
     * Add a product to the cart
     */
    const addToCart = () => dispatch({type: 'takeaway/addToCart', payload: { id: product.id, quantity: 1 }})

    /** @const {{setViewer: Function}} context */
    const { setViewer } = useContext(TakeawayContext)

    /**
     * Render
     */
    return (
        <li className="card">
            <div 
                className="card-image"
                onClick={() => setViewer(product)}
            >
                <Image
                    src={product.images.thumb} 
                    layout="fill"
                    objectFit="cover"
                    alt={product.name} 
                />
                <div className="card-tags">{product.tags.join(' - ')}</div>
            </div>
            <div className="card-header">
                <h4 className="card-header-title">{product.name}</h4>
                <div className="card-header-secondary">{product.secondary}</div>
                <button 
                    type="button" 
                    className="card-header-action"
                    onClick={() => addToCart()}
                >
                    <span>{__('add-to-cart')}</span>
                    <span><PlusSvg /></span>
                </button>
            </div>
        </li>
    )
}