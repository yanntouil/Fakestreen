/**
 * Configuration
 */

const config = {
    sitename: 'Fakestreet',
    siteurl: 'https://fakestreet.ourway.io',
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
}
export default config