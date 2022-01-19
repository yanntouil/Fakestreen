import { Provider } from 'react-redux'
import store from 'app/reducers/store'
import 'assets/styles/app.scss'

/**
 * Application component
 */
export default function Application({ Component, pageProps, router }) {
  
    /**
     * Render
     */
    return (
        <Provider store={store}>
            <Component {...pageProps} key={router.route} />
        </Provider>
    )
}

