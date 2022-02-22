import { useEffect, useRef } from 'react'
import { useTranslation, useWindowSize } from 'app/hooks'
import { clearScrollLocks, disableBodyScroll, enableBodyScroll } from 'app/helpers'
// Icons
import TimesSvg from 'assets/images/icons/times.svg'







/**
 * Display a modal
 * backdrop : Close on backdrop
 * close : Display close button
 * @param {{show: Boolean, setShow: Function, backdrop: Boolean, close: Boolean}} props
 */
export default function Modal({show , setShow, backdrop = true, close = true, modalFixe = false, children }) {
    /** @const {Function} __ */
    const __ = useTranslation('layout.modal')

    const ref = useRef()

    /**
     * Watcher on show
     */
    useEffect(() => {
        if (show) {// Add listener on modal opened
            disableBodyScroll()
        } else {// Remove listener on modal closed
            enableBodyScroll()
        }
        // Clear listener on modal unmount
        return () => {
            clearScrollLocks()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show])

    /** @const {Object} windowSize */
    const windowSize = useWindowSize()

    /**
     * Watcher on windowSize to center modal
     */
    useEffect(() => {
        if (ref && ref.current) {
            if (windowSize.height > ref.current.scrollHeight) {
                ref.current.style.top = '50%'
                ref.current.style.marginTop = (ref.current.scrollHeight / 2 * -1) + 'px'
            } else {
                ref.current.style.top = ''
                ref.current.style.marginTop = ''
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [windowSize])

    /**
     * Render
     */
    return (
        <>
            {show && (
                <div className="modal">
                    <div className="modal-backdrop" />
                    <div 
                        className={`modal-wrapper scrollbar${modalFixe ? ' modal-wrapper-fixe' : ''}`}
                        onClick={() => backdrop ? setShow(false) : false}
                    >
                        {close && (
                            <button 
                                type="button" 
                                className="modal-close"
                                onClick={() => setShow(false)}
                            >
                                <TimesSvg aria-hidden="true" />
                                <span className="sr-only">{__('close')}</span>
                            </button>
                        )}
                        <div 
                            className="modal-container"
                            ref={ref}
                            onClick={(e) => e.stopPropagation()}
                        >   
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}