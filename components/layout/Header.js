import React, { useState } from 'react';
import Link from 'next/link';
import { useEventListener, useResponsive } from 'app/hooks'

// Icons
import CheeseburgerSvg from 'assets/images/icons/cheeseburger.svg'
import LogoSvg from 'assets/images/logo.svg'




/**
 * Layout header Component
 */
export default function Header() {

    const media = useResponsive()
    
    useEventListener('scroll', (e) => {
        if (window.scrollY > 100) document.body.classList.add('scroll')
        else document.body.classList.remove('scroll')
    })


    const linksLeft = [{
        name: 'Home',
        href: '/',
    }, {
        name: 'Restaurant',
        href: '/',
    }, {
        name: 'Mango Bar',
        href: '/',
    }]
    const linksRight = [{
        name: 'About us',
        href: '/',
    }, {
        name: 'Take away',
        href: '/',
    }, {
        name: 'Contact us',
        href: '/',
    }]

    /**
     * Render
     */
    return (
        <header className={`header`}>
            <nav className="header-nav">
                <ul className="header-nav-menu left">
                    {media.min('lg') && linksLeft.map((link, index) => (
                        <li key={`header-nav-menu-link-${index}`}>
                            <Link href={link.href}>
                                <a className="header-nav-menu-link">
                                    {link.name}
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
                <Link href="/">
                    <a className="header-nav-logo">
                        <LogoSvg />
                    </a>
                </Link>
                <ul className="header-nav-menu right">
                    {media.min('lg') ? 
                    linksRight.map((link, index) => (
                        <li key={`header-nav-menu-link-${index}`}>
                            <Link href={link.href}>
                                <a className="header-nav-menu-link">
                                    {link.name}
                                </a>
                            </Link>
                        </li>
                    )) : (
                        <li>
                            <button className="header-nav-menu-collapse">
                                <CheeseburgerSvg />
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    )
}
