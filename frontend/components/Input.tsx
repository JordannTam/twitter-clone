import React from 'react'

interface InputProps {
    placeholder?: string,
    value?: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    type?: string,
    disabled?: boolean,
}

const Input:React.FC<InputProps> = ({
    value,
    onChange,
    type,
    disabled,
    placeholder,
}) => {
  return (
    <input placeholder={placeholder} onChange={onChange} type={type} disabled={disabled} value={value} className="w-full p-4 text-lg bg-black border-2 border-neutral-800 rounded-md outline-none text-white focus:border-sky-500 focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed" />
  )
}

export default Input