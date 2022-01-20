import React, { useState } from 'react';
import Link from 'next/link';
import { useEventListener } from 'app/hooks'





/**
 * Layout header Component
 */
export default function Header() {

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

    return (
        <header className={`header`}>
            <nav className="header-nav">
                <ul className="header-nav-menu left">
                    {linksLeft.map((link, index) => (
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
                        Logo
                    </a>
                </Link>
                <ul className="header-nav-menu right">
                    {linksRight.map((link, index) => (
                        <li key={`header-nav-menu-link-${index}`}>
                            <Link href={link.href}>
                                <a className="header-nav-menu-link">
                                    {link.name}
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}
