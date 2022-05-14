import React, { useState, useRef, useEffect } from 'react'

export default function TextInput({
    errorMessage = 'required',
    name,
    className = 'input-name w-100',
    placeholder,
    value,
    required = false,
    onChange,
    errorFieldName = '',
    readOnly=false,
    ...props
}) {
    const [validate, setValidate] = useState(false)
    const inputRef = useRef()

    useEffect(() => {
        if (errorFieldName && errorFieldName === name) {
            checkFieldValidation()
        }
    }, [errorFieldName])

    const checkFieldValidation = () => {
        if (!value) {
            setValidate(true)
            if (inputRef.current) {
                inputRef.current.focus()
            }
        }
    }
    const updateInputField = (e) => {
        if (e.target.value) {
            setValidate(false)
        }
        onChange(e)
    }
    return (
        <div className='d-flex flex-column m-0'>
            <input type="text"
                name={name}
                ref={inputRef}
                className={`mb-0 ${className}`}
                placeholder={placeholder}
                value={value}
                required={required}
                onChange={(e) => updateInputField(e)}
                onBlur={checkFieldValidation}
                readOnly={readOnly}
                {...props}
            />
            <div className='p-1'>
                {validate && <span className='text-danger'>{errorMessage}</span>}
            </div>
        </div>
    )
}
