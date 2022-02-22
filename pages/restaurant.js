import Image from 'next/image';
import React from 'react';

// Images
import instagram1 from 'public/images/restaurant/instagram/1.jpg'
import instagram2 from 'public/images/restaurant/instagram/2.jpg'
import instagram3 from 'public/images/restaurant/instagram/3.jpg'
import instagram4 from 'public/images/restaurant/instagram/4.jpg'
import instagram5 from 'public/images/restaurant/instagram/5.jpg'
import instagram6 from 'public/images/restaurant/instagram/6.jpg'
const instagram = [
    { name: 'instagram1' , image: instagram1 },
    { name: 'instagram2' , image: instagram2 },
    { name: 'instagram3' , image: instagram3 },
    { name: 'instagram4' , image: instagram4 },
    { name: 'instagram5' , image: instagram5 },
    { name: 'instagram6' , image: instagram6 },
]

/**
 * Contact component
 */
export default function Restaurant() {

    console.log(instagram);
    return (
        <>
            <div className="fs-image">
                <Image
                    src={'/images/hamburgers-with-fries-in-cup-and-sauce-on-wooden-tray.jpg'} 
                    layout="fill"
                    objectFit="cover"
                    priority={true}
                    alt={'image de test'} 
                />
            </div>
            <section className="container section">
                <div className="">
                    <h1 className="title">Le Restaurant</h1>
                    <p className="content">Lorem ipsum dolor sit amet!</p>
                </div>
            </section>
            <section className="container section">
            <div className="container section">
                    <h2 className="title">Opening hours</h2>
                    <div className="">
                        <div className="">
                            <h4 className="secondary">Monday to Tuesday</h4>
                            <p className="content">11:30 am - 2:00 pm</p>
                            <p className="content">18:30 pm - 10:00 pm</p>
                        </div>
                        <div className="">
                            <h4 className="secondary">Friday and Saturday</h4>
                            <p className="content">11:30 am - 2:00 pm</p>
                            <p className="content">18:30 am - 12:00 am</p>
                        </div>
                        <div className="">
                            <h4 className="secondary">Sunday Brunch</h4>
                            <p className="content">10:00 am - 4:00 pm</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container section">
                <h2>La carte</h2>
            </section>
            <section className="container section">
                <h2>Instagram</h2>
                <div className="instagram-grid">
                    {instagram.map((image, index) => (
                        <div key={`instagram-image-${index}`}>
                            <Image
                                src={image.image} 
                                layout="fill"
                                objectFit="cover"
                                priority={true}
                                alt={image.name} 
                            />
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export function Lightbox() {
    return (
        <>
        </>
    )
}