import { Provider } from 'react-redux'
import store from 'app/reducers/store'
import 'assets/styles/app.scss'
import Layout from 'components/layout/Layout'


/**
 * Application component
 */
export default function Application({ Component, pageProps, router }) {


    /**
     * Render
     */
    return (
        <Provider store={store}>
            <Layout>
                <Component {...pageProps} key={router.route} />
            </Layout>
        </Provider>
    )
}

