import React, { ChangeEvent } from 'react'

interface InputProps {
    placeholder?: string
    text?: string
    type?: string
    name?: string
    value?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input = (props: InputProps) => {
    const { text, placeholder, type, name, value, onChange } = props
  return (
    <>
        <label>{text}</label>
        <input value={value} onChange={onChange} name={name} placeholder={placeholder} type={type} />
    </>
  )
}

export default Input