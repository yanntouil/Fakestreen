import React, { useState } from 'react';
import Link from 'next/link';



// Icons
import CheckSvg from 'assets/images/icons/check.svg'
import MapMarkerSvg from 'assets/images/icons/map-marker-alt.svg'
import FacebookSvg from 'assets/images/icons/facebook-f.svg'
import InstagramSvg from 'assets/images/icons/instagram.svg'
import TwitterSvg from 'assets/images/icons/twitter.svg'

/**
 * Layout footer Component
 */
export default function Footer() {

    const [newsletterFD, setNewsletterFD] = useState({
        email: '',
        consent: false,
    })
    /**
     * newsletterSubmit
     * @param {SyntheticBaseEvent} e
     */
    const newsletterSubmit = (e) => {
        e.preventDefault()
    }

    /**
     * Render
     */
    return (
        <footer className="footer">
            <div className="footer-wrapper section container">
                {/* Newsletter */}
                <section className="footer-newsletter">
                    <h2 className="footer-title">Suscribe to newsletter</h2>
                    <form 
                        className="footer-newsletter-form"
                        onSubmit={newsletterSubmit}
                    >
                        <input 
                            className="form-text"
                            type="text" 
                            name="email"
                            placeholder="Your Email"
                            value={newsletterFD.email}
                            onChange={(e) => setNewsletterFD({...newsletterFD, email: e.target.value})}
                        />
                        <button 
                            type="submit"
                            className="form-submit"
                        >Send</button>
                        <label 
                            htmlFor="newsletter-consent"
                            className={`form-label${newsletterFD.consent ? ' active' : ''}`}
                        >
                            <input 
                                className="hidden"
                                type="checkbox" 
                                name="consent"
                                id="newsletter-consent"
                                checked={newsletterFD.consent}
                                onChange={() => setNewsletterFD({...newsletterFD, consent: !newsletterFD.consent})}
                            />
                            <span className="form-checkbox" aria-hidden="true">
                                {newsletterFD.consent && <CheckSvg />}
                            </span>
                            Newsletter consent text
                        </label>
                    </form>
                </section>
                {/* Follow */}
                <section className="footer-follow">
                    <h2 className="footer-title">Follow us on</h2>
                    <ul className="footer-follow-social">
                    <li>
                            <Link href="/">
                                <a className="footer-follow-social-link facebook">
                                    <FacebookSvg />
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a className="footer-follow-social-link twitter">
                                    <TwitterSvg />
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a className="footer-follow-social-link instagram">
                                    <InstagramSvg />
                                </a>
                            </Link>
                        </li>
                    </ul>
                </section>
                {/* Find us */}
                <div className="footer-findus">
                    <h2 className="footer-title">Where we are</h2>
                    <a 
                        className="footer-findus-link"
                        href="https://portfolio.ourway.io/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <span className="icon">
                            <MapMarkerSvg />
                        </span>
                        <span className="text">Show on map</span>
                    </a>
                </div>
            </div>
            <div className="footer-logo">
                Logo
            </div>
            <div className="footer-bottom-links">
                <h2>Fakestreet Bar & Restaurant © 2022</h2>
                <ul>
                    <li>
                        <a 
                            href="https://portfolio.ourway.io/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            Made and host by Ourway
                        </a>
                    </li>
                    <li>
                        <Link href="/terms-and-services">
                            <a>Terms and services</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/cookies-management">
                            <a>Cookies management</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    )
}