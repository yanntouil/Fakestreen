import React from 'react'
import Image from 'next/image'
import { TakeawayContextProvider } from 'app/context'

// Components
import Categories from 'components/pages/takeaway/Categories'
import Cart from 'components/pages/takeaway/Cart'
import Viewer from 'components/pages/takeaway/Viewer'
import Order from 'components/pages/takeaway/Order'

/**
 * Takeaway component
 */
export default function Takeaway() {

    /**
     * Render
     */
    return (
        <TakeawayContextProvider>
            <div className="fs-image fs-image-low takeaway-cover">
                <Image
                    src={'/images/pages/takeaway/cover.jpg'}
                    layout="fill"
                    objectFit="cover"
                    priority={true}
                    alt={'Cover image'}
                />
            </div>
            <section className="container section takeaway">
                <Categories />
                <Cart />
            </section>
            <Viewer />
            <Order />
        </TakeawayContextProvider>
    )
}