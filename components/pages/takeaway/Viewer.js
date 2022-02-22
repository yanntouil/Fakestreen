import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import { useMenu, useTranslation } from 'app/hooks'
import { TakeawayContext } from 'app/context'

// Components
import Modal from 'components/ui/Modal';

// Icons
import PlusSvg from 'assets/images/icons/plus.svg'
import MinusSvg from 'assets/images/icons/minus.svg'

/**
 * TakeawayViewer
 * ToDo : Si un utilisateur regarde un article qui est déjà dans le panier il peut ajouter d'autre produit mais pas modifier la quantité
  */
 export default function Viewer() {

    /** @const {{viewer: Object|false, setViewer: Function}} context */
    const { viewer, setViewer } = useContext(TakeawayContext)

    /** @const {Function} __ */
    const __ = useTranslation('pageTakeaway.viewer')

    /** @const {Object} menu */
    const menu = useMenu()

    /** @const {Object} categoriesById */
    const categoriesById = menu.getCategoriesById()

    /** @const {Object} allergensById */
    const allergensById = menu.getAllergensById()

    /** @const {Object|false} product */
    const product = viewer

    /** @state quantity */
    const [ quantity, setQuantity ] = useState(1)

    /**
     * Watcher on viewer - Reset quantity when viewer is close
     */
    useEffect(() => {
        if (viewer === false) setQuantity(1)
    }, [viewer])

    /** @const {Function} dispatch */
    const dispatch = useDispatch()

    /**
     * Add a product to the cart and close viewer
     */
    const addToCart = () => {
        dispatch({type: 'takeaway/addToCart', payload: { id: product.id, quantity }})
        setViewer(false)
    }

    /**
     * Render
     */
    return (
        <Modal show={viewer} setShow={setViewer}>
            {viewer && (
                <div className="takeaway-viewer">
                    {/* Product name */}
                    <div className="takeaway-viewer-heading">
                        <h2 className="takeaway-viewer-heading-title">{product.name}</h2>
                    </div>
                    <div className="takeaway-viewer-grid">
                        {/* Product Image */}
                        <div className="takeaway-viewer-image">
                            <Image
                                src={product.images.thumb}
                                layout="fill"
                                objectFit="cover"
                                priority={true}
                                alt={'image de test'} 
                            />
                        </div>
                        {/* Product informations */}
                        <div className="takeaway-viewer-info">
                            {/* Price and category */}
                            <div className="heading">
                                <span className="heading-price">
                                    {product.price.toFixed(2)}€
                                </span>
                                <span className="info-heading">
                                    {categoriesById[product.category].name}
                                </span>
                            </div>
                            {/* Description */}
                            <div className="description">
                                {product.description}
                            </div>
                            {/* Allergens */}
                            <div className="allergens">
                                <h3 className="info-heading">{__('allergens')}</h3>
                                <ul className="allergens-list">
                                    {product.allergens.map((id, index) => (
                                        <li className="allergens-list-item" key={`dish-viewer-allergen-${index}`}>
                                            {allergensById[id].name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* Add to the cart */}
                            <div className="cart">
                                <div className="info-heading">{__('order')}</div>
                                <div className="cart-content">
                                    <span className="cart-title">{__('order-quantity')} :</span>
                                    <div className="cart-quantity">
                                        <button
                                            className="cart-quantity-button"
                                            onClick={() => setQuantity(quantity <= 1 ? 1 : quantity - 1)}
                                        >
                                            <MinusSvg aria-hidden="true" />
                                            <span className="sr-only">{__('minus')}</span>
                                        </button>
                                        <span className="cart-quantity-counter">{quantity}</span>
                                        <button
                                            className="cart-quantity-button"
                                            onClick={() => setQuantity(quantity + 1)}
                                        >
                                            <PlusSvg aria-hidden="true" />
                                            <span className="sr-only">{__('plus')}</span>
                                        </button>
                                    </div>
                                    <button 
                                        className="cart-submit"
                                        onClick={() => addToCart()}
                                    >{__('order-submit')}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Modal>
    )
}