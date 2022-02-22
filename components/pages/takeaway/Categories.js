import React from 'react'
import { useMenu, useTranslation } from 'app/hooks'

// Components
import Category from './Category'

// Icons
import HatChefSvg from 'assets/images/icons/hat-chef.svg'

/**
 * TakeawayCategories
 */
 export default function Categories() {

    /** @const {Function} __ */
    const __ = useTranslation('pageTakeaway')

    /** @const {Object} menu */
    const menu = useMenu()

    /** @const {Object} categories */
    const categories = menu.getCategoriesWithDishes()

    /**
     * Render
     */
    return (
        <div className="takeaway-categories">
            <div className="takeaway-categories-heading">
                <div className="takeaway-categories-heading-icon">
                    <HatChefSvg aria-hidden="true" />
                </div>
                <h2 className="takeaway-categories-heading-title">{__('categories-title')}</h2>
            </div>
            {categories.map((category) => category.dishes.length > 0 ? (// Display only categories with dishes
                <Category
                    key={`takeaway-category-${category.id}`}
                    {...{ category }}
                />
            ) : (
                <></>
            ))}
        </div>
    )
}
