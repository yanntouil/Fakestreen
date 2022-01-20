import React from 'react';

// Components
import Header from 'components/layout/Header';
import Main from 'components/layout/Main';
import Footer from 'components/layout/Footer';





/**
 * Layout Component
 */
export default function Layout({ children }) {
    return (
        <>
            <Header />
            <Main>
                {children}
            </Main>
            <Footer />
        </>
    )
}
