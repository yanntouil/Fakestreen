import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'app/hooks'
import { ccNumberRegex, ccExpRegex, ccCvvRegex } from 'app/helpers/regex'
// Components
import Form, { FormGroup } from 'components/ui/Form'
import { Icon } from 'components/ui/icon'
// Icons
import CcCryptoSvg from 'assets/images/icons/cc-crypto.svg'

/**
 * Display step 3 : Payment
 */
 export default function OrderPayment({ formData, setFormData, setValidity }) {
    /** @const {Function} __ */
    const __ = useTranslation('pageTakeaway')

    /** @const {[ Object, Function ]} paymentModeRef */
    const paymentModeRef = useRef({scrollHeight: 0})
    
    /** @const {[ Number, Function ]} state */
    const [ paymentModeHeight , setPaymentModeHeight ] = useState(0)

    /** @const {Array} */
    const paymentModes = [
        { name: 'card', icon: 'credit-card-front', title: 'Carte' },
        { name: 'paypal', icon: 'paypal fab', title: 'PayPal' },
        { name: 'direct', icon: 'store', title: 'Sur place' },
    ]

    /**
     * Check step 3
     */
    const ValidForm = () => {
        if (['paypal', 'direct'].includes(formData.paymentMode)) return true
        // Check credit card
        const fieldEmpty = ['ccName', 'ccNumber', 'ccExp', 'ccCvv'].reduce(
            (empty, field) => empty + (! formData[field].trim() ? 1 : 0)
            , 0)
        if (fieldEmpty > 0) return false
        const ccNumberValid = formData.ccNumber.match(ccNumberRegex)
        const ccExpValid = formData.ccExp.match(ccExpRegex)
        const ccCvvValid = formData.ccCvv.match(ccCvvRegex)
        return ccNumberValid && ccExpValid && ccCvvValid
    }
    
    /**
     * Watch on formData to check validity
     */
    useEffect(() => {
        setValidity(ValidForm())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData])

    
    /**
     * Watch on paymentModeRef to update paymentMode scrollHeight
     */
    useEffect(() => {
        if(paymentModeRef) setPaymentModeHeight(paymentModeRef.current.scrollHeight)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paymentModeRef])
    
    /**
     * Render
     */
    return (
        <>
            <div className="heading">
                <div className="heading-icon">
                    <Icon name="cash-register" />
                </div>
                <div className="heading-content">
                    <h2 className="heading-title">Votre mode de paiement</h2>
                    <p className="heading-secondary">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum dolorum autem maiores earum eaque numquam quo recusandae. Ad ex error expedita molestias, tempore neque? Tempora totam deserunt saepe natus sequi.</p>
                </div>
            </div>
            <div className="payment-select">
                {paymentModes.map((mode, index) => (
                    <button 
                        key={`payment-select-mode-${index}`}
                        className={`payment-select-mode ${formData.paymentMode === mode.name ? 'active' : ''}`}
                        onClick={() => setFormData({ ...formData, paymentMode: mode.name })}
                    >
                        <Icon name={mode.icon} className="icon" />
                        {mode.name}
                    </button>
                ))}
            </div>
            <div 
                className="payment-card"
                ref={paymentModeRef}
                style={{
                    height: formData.paymentMode === 'card' ? paymentModeHeight + 'px' : 0
                }}
            >
                <div className="heading">
                    <div className="heading-icon" aria-hidden="true">
                        <Icon name="credit-card-front" />
                    </div>
                    <div className="heading-content">
                        <h2 className="heading-title">Information sur votre carte de paiement</h2>
                        <p className="heading-secondary">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum dolorum autem maiores earum eaque numquam quo recusandae. Ad ex error expedita molestias, tempore neque? Tempora totam deserunt saepe natus sequi.</p>
                    </div>
                </div>
                <Form values={formData} setValues={setFormData} name="payment">
                    <FormGroup
                        label="Nom sur la carte"
                        placeholder="Nom Prénom"
                        name="ccName" 
                        autoComplete="cc-name"
                        autoCorrect="off"
                        spellCheck="false"
                    />
                    <FormGroup
                        label="Numéro de la carte"
                        placeholder="0000-0000-0000-0000"
                        name="ccNumber"
                        autoComplete="cc-number"
                        autoCorrect="off"
                        spellCheck="false"
                    />
                    <div className="payment-card-grid">
                        <FormGroup
                            label="Date de validité"
                            placeholder="MM/AA"
                            name="ccExp"
                            autoComplete="cc-exp"
                            autoCorrect="off"
                            spellCheck="false"
                        />
                        <FormGroup
                            label="Cryptogramme visuel"
                            placeholder="123"
                            name="ccCvv"
                            type="tel"
                            autoCorrect="off"
                            spellCheck="false"
                        />
                        <CcCryptoSvg />
                    </div>
                </Form>
            </div>
        </>
    )
}
