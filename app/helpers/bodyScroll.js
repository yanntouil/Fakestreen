import { disableBodyScroll as disableScroll, enableBodyScroll as enableScroll, clearAllBodyScrollLocks as clearLocks } from 'body-scroll-lock'


const body = typeof window !== "undefined" ? document.body : {}

const disableBodyScroll = () => {
    body.style.width = body.clientWidth + 'px'
    disableScroll(body)
}

const enableBodyScroll = () => {
        body.style.width = ''
        enableScroll(body)
}

const clearScrollLocks = () => {
    body.style.width = ''
    clearLocks()
}
export { disableBodyScroll, enableBodyScroll, clearScrollLocks }