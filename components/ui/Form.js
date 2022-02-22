import React, { createContext, useContext } from 'react';
import { Range } from 'react-range';
import { $CombinedState } from 'redux';
import { Icon } from './icon';

/**
 * Create context
 */
const FormContext = createContext()

/**
 * Form
 */
export default function Form(props) {
    const cleanProps = {...props}
    delete(cleanProps.values)
    delete(cleanProps.setValues)
    delete(cleanProps.name)
    cleanProps.className = cleanProps.className ?? 'form'

    return (
        <FormContext.Provider value={{
            values: props.values, 
            setValues: props.setValues,
            name: props.name
        }}>
            <form { ...cleanProps }
            />
        </FormContext.Provider>
    )
}

/**
 * FormInput
 */
export function FormInput(props) {
    const context = useContext(FormContext)
    const cleanProps = {...props}
    cleanProps.className = cleanProps.className ?? 'form-input'
    cleanProps.id = props.id ?? context.name + '-' + props.name
    cleanProps.type = props.type ?? 'text'
    const onChange = ({target}) => {
        const values = { ...context.values }
        values[props.name] = target.value
        context.setValues(values)
    }
    return (
        <input 
            { ...cleanProps } 
            value={context.values[props.name]}
            onChange={onChange}
        />
    )
}

/**
 * FormInput
 */
export function FormGroup(props) {
    const context = useContext(FormContext)
    const cleanProps = { ...props }
    cleanProps.id = props.id ?? context.name + '-' + props.name
    cleanProps.className = cleanProps.className ?? 'form-group-input'
    delete(cleanProps.label)
    return (
        <div className="form-group">
            <label 
                className="form-group-label"
                htmlFor={cleanProps.id}
            >
                {props.label}
            </label>
            <FormInput { ...cleanProps }/>
        </div>
    )
}

/**
 * FormCheckbox
 */
export function FormCheckbox(props) {
    const context = useContext(FormContext)
    const cleanProps = { ...props }
    cleanProps.id = props.id ?? context.name + '-' + props.name
    // cleanProps.className = cleanProps.className ?? 'form-group-input'
    delete(cleanProps.label)
    const onChange = ({target}) => {
        const values = { ...context.values }
        values[props.name] = target.checked
        context.setValues(values)
    }
    return (
        <label 
            className="form-checkbox" 
            htmlFor={cleanProps.id}
        >
            <input 
                className="form-checkbox-hidden"
                type="checkbox"
                { ...cleanProps }
                checked={context.values[props.name]}
                onChange={onChange}
            />
            <span className="form-checkbox-check" aria-hidden="true">
                {context.values[props.name] && <Icon name="check" className="checked" />}
            </span>
            <span className="form-checkbox-label">{props.label}</span>
        </label>
    )
}

/**
 * FormInput
 */
 export function FormRadio(props) {
    const context = useContext(FormContext)
    const cleanProps = { ...props }
    cleanProps.id = props.id ?? context.name + '-' + props.name + '-' + props.value
    delete(cleanProps.label)
    const onChange = ({target}) => {
        const values = { ...context.values }
        values[props.name] = target.value
        context.setValues(values)
    }
    return (
        <label 
            className="form-radio" 
            htmlFor={cleanProps.id}
        >
            <input 
                className="form-radio-hidden"
                type="radio"
                { ...cleanProps }
                checked={context.values[props.name] === props.value}
                onChange={onChange}
            />
            <span className="form-radio-check" aria-hidden="true">
                {context.values[props.name] === props.value && <span className="checked" />}
            </span>
            <span className="form-radio-label">{props.label}</span>
        </label>
    )
}

/**
 * FormRadioButtons
 */
export function FormRadioButtons(props) {
    const context = useContext(FormContext)
    const id = context.name + '-' + props.name
    const onChange = ({target}) => {
        const values = { ...context.values }
        values[props.name] = target.value
        context.setValues(values)
    }
    
    return (
        <div  className="form-radio-buttons">
            {props.values.map((radio, index) => (
                <label 
                    key={context.name + '-' + props.name + '-' + index}
                    htmlFor={context.name + '-' + props.name + '-' + index} 
                    className={`form-radio-buttons-label ${context.values[props.name] === radio.value ? 'checked' : ''}`}
                >
                    <input 
                        type="radio"
                        name={props.name} 
                        id={context.name + '-' + props.name + '-' + index}
                        value={radio.value}
                        checked={context.values[props.name] === radio.value}
                        onChange={onChange}
                        className="form-radio-buttons-hidden"
                    />
                    <span>{radio.label}</span>
                </label>
            ))}
        </div>
    )
}

/**
 * FormRange
 */
export function FormRange(props) {
    const context = useContext(FormContext)
    const globalProps = { ...props }
    const onChange = (newValues) => {
        const values = { ...context.values }
        values[props.name] = newValues
        context.setValues(values)
    }
    globalProps.formatValue = props.formatValue ?? (value => value)
    globalProps.formatValue = props.formatValue ?? (value => value)
    return (
        <div className="form-range">
            <Range 
                step={props.step}
                min={props.min}
                max={props.max}
                values={[context.values[props.name] ? context.values[props.name] : props.min]}
                onChange={onChange}
                renderTrack={({ props, children }) => (
                    <div
                        {...props}
                        className="form-range-bar"
                    >
                        {children}
                    </div>
                )}
                renderThumb={({ props }) => (
                    <div {...props} className="form-range-thumb">
                        <span className="form-range-thumb-value">{globalProps.formatValue(context.values[globalProps.name])}</span>
                    </div>
                )}
                renderMark={({ props, index }) => (
                    <div {...props} className="form-range-track">
                        {globalProps.displayTrack && (
                            index === 0 ||// First
                            index === ((globalProps.max - globalProps.min) / globalProps.step) ||// Last
                            globalProps.displayTrack(globalProps.min + globalProps.step * index)
                        ) && (
                            <span className="form-range-track-value">
                                {globalProps.formatValue(globalProps.min + index * globalProps.step)}
                            </span>
                        )}
                    </div>
                )}
            />
        </div>
    )
}












