import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { clearScrollLocks, disableBodyScroll, enableBodyScroll } from 'app/helpers'
import { useEventListener, useResponsive, useTranslation } from 'app/hooks'
import config from 'app/config'
// Images
import LogoSvg from 'assets/images/logo3.svg'
import LogoRingSvg from 'assets/images/logo-ring.svg'
// Icons
import CheeseburgerSvg from 'assets/images/icons/cheeseburger.svg'
import TimesSvg from 'assets/images/icons/times.svg'




/**
 * Layout header Component
 */
export default function Header() {
    
    /** @const {NextRouter} __ */
    const router = useRouter()

    /** @const {Function} __ */
    const __ = useTranslation('layout.menu')

    /** @const {Object} media */
    const media = useResponsive()

    /** @state mobileMenu */
    const [ mobileMenu , setMobileMenu ] = useState(false)
    
    /**
     * Add 'scroll' class on body when user scroll more 100px
     */
    useEventListener('scroll', () => {
        if (window.scrollY > 100) document.body.classList.add('scroll')
        else document.body.classList.remove('scroll')
    })

    /** @const {Array} linksLeft */
    const linksLeft = config.menu.filter(link => link.side === 'left')

    /** @const {Array} linksRight */
    const linksRight = config.menu.filter(link => link.side === 'right')

    /**
     * Render
     */
    return (
        <header className={`header`}>
            <nav className="header-nav">
                {/* Menu left */}
                <ul className="header-nav-menu left">
                    {media.min('lg') && linksLeft.map((link, index) => (
                        <li key={`header-nav-menu-left-link-${index}`}>
                            <Link href={link.pathname}>
                                <a className={`header-nav-menu-link${router.pathname === link.pathname ? ' active' : ''}`}>
                                    {__(link.name)}
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
                {/* Logo */}
                <Link href="/">
                    <a className="header-nav-logo">
                        <LogoSvg aria-hidden="true" />
                        <span className="sr-only">{config.sitename}</span>
                    </a>
                </Link>
                {/* Menu right */}
                <ul className="header-nav-menu right">
                    {media.min('lg') ? 
                    linksRight.map((link, index) => (
                        <li key={`header-nav-menu-link-${index + linksLeft.length}`}>
                            <Link href={link.pathname}>
                                <a className="header-nav-menu-link">
                                    {__(link.name)}
                                </a>
                            </Link>
                        </li>
                    )) : (
                        <li>
                            <button 
                                className="header-nav-menu-collapse"
                                onClick={() => setMobileMenu(true)}
                            >
                                <CheeseburgerSvg />
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
            {/* Mobile menu */}
            {(media.max('lg') && mobileMenu) && (
                <HeaderMobileMenu { ...{ mobileMenu, setMobileMenu } }/>
            )}
        </header>
    )
}

/**
 * Layout HeaderMobileMenu Component
 */
export function HeaderMobileMenu({ mobileMenu, setMobileMenu }) {
    /** @const {NextRouter} __ */
    const router = useRouter()

    /** @const {Function} __ */
    const __ = useTranslation('layout.menu')

    /** @ref linksRef */
    const linksRef = useRef([])

    /** @const {Array} linksLeft */
    const linksLeft = config.menu.filter(link => link.side === 'left')

    /** @const {Array} linksRight */
    const linksRight = config.menu.filter(link => link.side === 'right')

    /**
     * Manage keybord interaction
     * @param {SyntheticBaseEvent} e
     */
    const manageKeyboard = (e) => {
        if (!['ArrowDown', 'ArrowUp', 'Home', 'End', 'Escape'].includes(e.key)) return
        if (e.key === 'Escape') return setMobileMenu(false)
        e.preventDefault()
        const activeLink = document.activeElement
        const links = linksRef.current
        let index = links.findIndex((link) => link.contains(activeLink))
        if (e.key === 'ArrowDown' && ++index === links.length) index = 0// ArrowDown => Go to next or first if is last
        else if (e.key === 'ArrowUp' && --index < 0) index = links.length -1// ArrowUp => Go to previous or last if is first
        else if (e.key === 'Home') index = 0// Home => Go to first
        else if (e.key === 'End') index = links.length -1// End => Go to last
        links[index].focus()
    }

    /**
     * Watcher on mobileMenu
     */
    useEffect(() => {
        if (mobileMenu) {// Add listener on menu opened
            window.addEventListener('keydown', manageKeyboard)
            disableBodyScroll()
        } else {// Remove listener on menu closed
            window.removeEventListener('keydown', manageKeyboard)
            enableBodyScroll()
        }
        return () => {
            window.removeEventListener('keydown', manageKeyboard)
            clearScrollLocks()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mobileMenu])

    /**
     * Render
     */
    return (
        <>
            <div className="mobile-backdrop" />
            <nav className="mobile-wrapper">
                {/* Close button */}
                <button 
                    className="mobile-close" 
                    onClick={() => setMobileMenu(false)}
                >
                    <TimesSvg aria-hidden="true" />
                    <span className="sr-only">{__('close-menu')}</span>
                </button>
                {/* Menu left */}
                <ul className="mobile-menu left">
                    {linksLeft.map((link, index) => (
                        <li key={`mobile-menu-link-${index}`}>
                            <Link href={link.pathname}>
                                <a 
                                    className={`mobile-menu-link${router.pathname === link.pathname ? ' active' : ''}`}
                                    ref={el => linksRef.current[index] = el}
                                    onClick={() => setMobileMenu(false)}
                                >{__(link.name)}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
                {/* Logo */}
                <LogoRingSvg 
                    className="mobile-menu-logo" 
                    aria-hidden="true" 
                />
                {/* Menu right */}
                <ul className="mobile-menu right">
                    {linksRight.map((link, index) => (
                        <li key={`mobile-menu-link-${index + linksLeft.length}`}>
                            <Link href={link.pathname}>
                                <a 
                                    className={`mobile-menu-link${router.pathname === link.pathname ? ' active' : ''}`}
                                    ref={el => linksRef.current[index + linksLeft.length] = el}
                                    onClick={() => setMobileMenu(false)}
                                >{__(link.name)}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    )
}
