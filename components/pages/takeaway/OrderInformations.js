import React, {  useEffect,  useState } from 'react'
import { useTranslation } from 'app/hooks'
import config from 'app/config'
import { isDate, takewayNextServiceAvailable, takewayServicesAvailable, takewayServiceTimeRange, zeroPad } from 'app/helpers'
import { mailRegex, phoneRegex } from 'app/helpers/regex'

// Components
import Form, { FormGroup, FormRadioButtons, FormRange } from 'components/ui/Form'
import { Icon } from 'components/ui/icon'

/**
 * Display step 2 : Informations
 */
 export default function OrderInformations({ formData, setFormData, setValidity }) {
    /** @const {Function} __ */
    const __ = useTranslation('pageTakeaway.order.informations')

    /** @const {[timeRange: Object, setTimeRange: Function]} state */
    const [ timeRange, setTimeRange ] = useState(takewayServiceTimeRange(formData))
    
    /** @const {[timeRange: Object, setTimeRange: Function]} state */
    const [ servicesAvailable, setServicesAvailable ] = useState(takewayServicesAvailable(formData))

    /** @const {Date} today */
    const today = new Date()

    /** @const {{min: Date, max: Date}} dateRange */
    const dateRange = {
        min: today.toISOString().split("T")[0],
        max: (new Date(today.getFullYear(), today.getMonth(), today.getDate() + config.takeaway.orderDateMax)).toISOString().split("T")[0],
    }

    /**
     * Watch on date change and reset services and time
     */
    useEffect(() => {
        const newServicesAvailable = takewayServicesAvailable(formData)
        const service = takewayNextServiceAvailable(formData.date)
        const newTimeRange = takewayServiceTimeRange({ ...formData, service })
        setFormData({ ...formData, service, time: newTimeRange[0] })
        setServicesAvailable(newServicesAvailable)
        setTimeRange(newTimeRange)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData.date])

    /**
     * Watch on service change and reset time
     */
    useEffect(() => {
        const newTimeRange = takewayServiceTimeRange(formData)
        setTimeRange(newTimeRange)
        setFormData({ ...formData, time: newTimeRange[0] })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData.service])

    /**
     * Check step 2
     */
    const ValidForm = () => {
        // Check user info
        const fieldEmpty = ['lastname', 'firstname'].reduce(
            (empty, field) => empty + (! formData[field].trim() ? 1 : 0)
        , 0)
        const emailValid = formData.email.match(mailRegex)
        const phoneValid = formData.phone.match(phoneRegex)
        if (fieldEmpty > 0 || !emailValid || !phoneValid) return false
        // Check order info
        const dateValid = isDate(new Date(formData.date))
        const serviceValid = takewayServicesAvailable(formData).includes(formData.service)
        const timeRange = takewayServiceTimeRange(formData)
        const timeValid = timeRange[0] < timeRange [1] && timeRange[0] <= formData.time && formData.time <= timeRange [1]
        return dateValid && serviceValid && timeValid
    }
    
    /**
     * Watch on formData to check validity
     */
    useEffect(() => {
        setValidity(ValidForm())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData])
    
    /**
     * Render
     */
    return (
        <>
            <div className="heading">
                <div className="heading-icon">
                    <Icon name="address-card" />
                </div>
                <div className="heading-content">
                    <h2 className="heading-title">{__('title')}</h2>
                    <p className="heading-secondary">{__('secondary')}</p>
                </div>
            </div>
            <Form values={formData} setValues={setFormData} name="Informations">
                {/* Lastname and Firstname */}
                <div className="information-grid">
                    {/* Lastname */}
                    <FormGroup
                        label={__('lastname')}
                        name="lastname" 
                        autoComplete="lastname"
                        autoCorrect="off"
                        spellCheck="false"
                    />
                    {/* Firstname */}
                    <FormGroup
                        label={__('firstname')}
                        name="firstname" 
                        autoComplete="firstname"
                        autoCorrect="off"
                        spellCheck="false"
                    />
                </div>
                {/* Email */}
                <FormGroup
                    label={__('email')}
                    placeholder={__('email-placeholder')}
                    name="email"
                    autoComplete="email"
                    autoCorrect="off"
                    spellCheck="false"
                />
                {/* Phone number */}
                <FormGroup
                    label={__('phone')}
                    placeholder={__('phone-placeholder')}
                    name="phone"
                    type="tel"
                    autoComplete="phone"
                    autoCorrect="off"
                    spellCheck="false"
                />
                {/* Date and service select */}
                <div className="information-grid">
                    {/* Order date picker */}
                    <FormGroup
                        label={__('pickup-date')}
                        name="date"
                        type="date"
                        min={dateRange.min}
                        max={dateRange.max}
                    />
                    {/* Order service select */}
                    {servicesAvailable.length > 0 && (
                        <div className="form-group">
                            <label className="form-group-label">{__('pickup-service')}</label>
                            <FormRadioButtons
                                name="service"
                                values={servicesAvailable.map(service => ({label: __('service-' + service), value: service}))}
                            />
                        </div>
                    )}
                </div>
                {/* Order time picker or not available time message */}
                {timeRange[0] < timeRange[1] ? (
                    <div className="form-group">
                        <label className="form-group-label">{__('pickup-time')}</label>
                        <FormRange 
                            name="time"
                            step={config.takeaway.serviceTimeStep / 60 * 100}// Switch time on decimal 15 > 25
                            min={timeRange[0]}
                            max={timeRange[1]}
                            formatValue={// Format decimal time on local time 1250 > 12h30
                                (value) => +(`${value}`.slice(0,2)) + 'h' + zeroPad((60 / 100 * +(`${value}`.slice(2,4))), 2)
                            }
                            displayTrack={// Select which time will be display on track : Rounded hours 1200 1300
                                (value) =>  +(`${value}`.slice(2,4)) === 0
                            }
                        />
                    </div>
                ) : (
                    <div className="form-group-label">{__('no-pickup-available')}</div>
                )}
            </Form>
        </>
    )
}
