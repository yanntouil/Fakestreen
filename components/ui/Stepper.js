import React from 'react'
import { Icon } from 'components/ui/icon'




/**
 * Display the stepper
 * @param {{step: Number, setStep: Function, steps: Array}} props
 */
export function Stepper({ step, setStep, steps }) {
    /**
     * Render
     */
    return (
        <ul className="stepper">
            {steps.map((item, index) => (
                <li 
                    key={`stepper-step-${index}`}
                    className={`stepper-step ${step > index ? 'done' : ''} ${step === index ? 'current' : ''}`}
                >
                    <button
                        className="stepper-step-button"
                        onClick={() => setStep(index)}
                    >
                        <Icon name={step > index ? 'check' : item.icon} />
                    </button>
                    <span className="stepper-step-title">
                        {item.title}
                    </span>
                </li>
            ))}
        </ul>
    )
}
