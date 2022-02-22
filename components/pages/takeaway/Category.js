import React, { useContext, useRef } from 'react'
import Image from 'next/image'
import { TakeawayContext } from 'app/context'

// Components
import Dish from './Dish'

/**
 * TakeawayCategory
 * @param {{category: Object}} props
 */
 export default function Category({ category }) {

    /** @const {{viewer: Object|false, setViewer: Function}} context */
    const { categoryOpen, setCategoryOpen } = useContext(TakeawayContext)

    /** @const {Object} ref  */
    const ref = useRef()

    /**
     * Render
     */
    return (
        <div className="takeaway-category">
            <button 
                className="heading" 
                onClick={() => setCategoryOpen(// Toggle
                    categoryOpen === category.id ? -1 : category.id
                )}
            >
                <span className="heading-title">{category.name}</span>
                <span className="heading-image">
                    <Image
                        src={category.images.thumb}
                        layout="fill"
                        objectFit="cover"
                        priority={true}
                        alt={category.name} 
                    />
                </span>
            </button>
            <div 
                className="content" 
                ref={ref}
                style={{
                    height: categoryOpen === category.id ? ref.current.scrollHeight : 0
                }}
            >
                <ul className="grid">
                    {category.dishes.map((dish) => (
                        <Dish 
                            key={`takeaway-category-${category.id}-dish-${dish.id}`}
                            {...{ dish }} 
                        />
                    ))}
                </ul>
            </div>
        </div>
    )
}