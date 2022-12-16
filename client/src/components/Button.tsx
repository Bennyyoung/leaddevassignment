import React from 'react'

interface ButtonProps {
    text?: string
}

const Button = (props: ButtonProps) => {
    const { text } = props
  return (
    <button>
        {text}
    </button>
  )
}

export default Button