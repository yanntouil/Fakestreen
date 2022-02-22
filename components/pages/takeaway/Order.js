import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'app/hooks'
import { TakeawayContext } from 'app/context'
import { takewayNextServiceAvailable, takewayServiceTimeRange } from 'app/helpers'

// Components
import Modal from 'components/ui/Modal'
import { Stepper } from 'components/ui/Stepper'
import OrderCheck from './OrderCheck'
import OrderInformations from './OrderInformations'
import OrderPayment from './OrderPayment'
import OrderReview from './OrderReview'
import OrderConfirmation from './OrderConfirmation'

/**
 * Display Order
 */
 export default function Order() {
    /** @const {Function} __ */
    const __ = useTranslation('pageTakeaway.order')

    /** @const {{order: Boolean, setOrder: Function}} context : Show or hide order */
    const { order, setOrder } = useContext(TakeawayContext)

    /** @const {[ Number, Function ]} state : Order Step */
    const [ step, setStep ] = useState(0)

    /** @const {[ Boolean, Function ]} state : Order step 1 is valid or not */
    const [ validityStep1, setValidityStep1 ] = useState(false)

    /** @const {[ Boolean, Function ]} state : Order step 2 is valid or not */
    const [ validityStep2, setValidityStep2 ] = useState(false)

    /** @const {[ Boolean, Function ]} state : Order step 2 is valid or not */
    const [ validityStep3, setValidityStep3 ] = useState(false)

    /** @const {Date} today : shortcut */
    const today = new Date()

    /** @const {[ Object, Function ]} state : Form data use for the order */
    const [ formData, setFormData ] = useState({
        firstname: '', lastname: '', email: '', phone: '',
        date: today.toISOString().split("T")[0],
        service: takewayNextServiceAvailable(today),
        time: takewayServiceTimeRange({ date: today })[0],
        ccName: '', ccNumber: '', ccExp: '', ccCvv: '',
        paymentMode: 'direct',
    })
    
    /** @const {[ Array ]} : shortcut */
    const steps = [
        { name: 'check', icon: 'file-invoice', title: __('stepper.check') },
        { name: 'informations', icon: 'address-card', title: __('stepper.informations') },
        { name: 'payment', icon: 'cash-register', title: __('stepper.payment') },
        { name: 'review', icon: 'file-invoice', title: __('stepper.review') }
    ]

    /**
     * Watch order to reset step before close order
     */
    useEffect(() => {
        if (order === false) setStep(0)
    }, [order])
    
    /**
     * Render
     */
    return (
        <Modal show={order} setShow={setOrder} backdrop={false}>
            <div className="takeaway-order">
                {/* Stepper */}
                {step < 5 && (
                    <header className="takeaway-order-header">
                        <Stepper { ...{ step, setStep, steps } } />
                    </header>
                )}
                {/* Steps */}
                <div className="takeaway-order-content">
                    {step === 0 && (// Step 1
                        <OrderCheck setValidity={setValidityStep1} />
                    )}
                    {step === 1 && (// Step 2
                        <OrderInformations setValidity={setValidityStep2} { ...{ formData, setFormData } } />
                    )}
                    {step === 2 && (// Step 3
                        <OrderPayment setValidity={setValidityStep3} { ...{ formData, setFormData } } />
                    )}
                    {step === 3 && (// Step 4
                        <OrderReview { ...{ formData } } />
                    )}
                    {step === 4 && (// Step 5
                        <OrderConfirmation />
                    )}
                </div>
                {/* Navigation */}
                <footer className="takeaway-order-footer">
                    {(step >= 1 && step <= 3) && (
                        <button 
                            className="btn"
                            onClick={() => setStep(step - 1)}
                        >{__('stepper.previous')}</button>
                    )}
                    {(step === 0) && (// Step 1
                        <button 
                            className="btn"
                            onClick={() => setStep(1)}
                            disabled={!validityStep1}
                        >{__('stepper.next')}</button>
                    )}
                    {(step === 1) && (// Step 2
                        <button 
                            className="btn"
                            onClick={() => setStep(2)}
                            disabled={!validityStep2}
                        >{__('stepper.next')}</button>
                    )}
                    {step === 2 && (// Step 3
                        <button 
                        className="btn"
                        onClick={() => setStep(3)}
                        disabled={!validityStep3}
                    >{__('stepper.next')}</button>
                )}
                </footer>
            </div>
        </Modal>
    )
}