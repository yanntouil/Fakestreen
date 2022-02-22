/**
 * Configuration
 */

const config = {
    sitename: 'Fakestreet',
    siteurl: 'https://fakestreet.ourway.io',
    monetaryUnit: '€',
    menu: [
        {name: 'home', pathname: '/', side: 'left'},
        {name: 'restaurant', pathname: '/restaurant', side: 'left'},
        {name: 'bar', pathname: '/bar', side: 'left'},
        {name: 'about', pathname: '/about-us', side: 'right'},
        {name: 'takeaway', pathname: '/takeaway', side: 'right'},
        {name: 'contact', pathname: '/contact-us', side: 'right'},
    ],
    translation: {
        languages: ['fr', 'en'],// Languages available
        defaultLanguage: 'fr',// Default language
        fallbackLanguage: 'fr',// Fallback language use if translation is not found
        notFoundError: true,// Show error in console
        locale: {
            fr: 'fr-fr',
            en: 'en-us',
        }
    },
    google: {
        gMapApiKey : 'AIzaSyBotMFNB4V8H_llMYaSki0LeMNyOE7mSqo'
    },
    takeaway: {
        orderDateMax: 31,// Order date max available on datepicker
        serviceTimeStep: 15,// Time step in minnutes use in time picker
    },
}
export default config