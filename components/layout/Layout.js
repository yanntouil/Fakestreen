/* eslint-disable @next/next/no-page-custom-font */
import React from 'react'
import Head from 'next/head'
// Components
import Header from 'components/layout/Header'
import Main from 'components/layout/Main'
import Footer from 'components/layout/Footer'





/**
 * Layout Component
 */
export default function Layout({ children }) {
    return (
        <>
            <Head>
                {/* <link href="/assets/fonts/fa/" rel="stylesheet" /> */}
            </Head>
            <Header />
            <Main>
                {children}
            </Main>
            <Footer />
        </>
    )
}
