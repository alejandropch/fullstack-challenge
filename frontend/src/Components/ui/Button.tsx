import React from 'react'

interface ButtonProps{
  text: string;
  type: "submit" | "button" | "reset";
  className?: string; 
}
export default function Button({text,type, className=""}:ButtonProps) {
  return (
    <button
    type={type}
    className={"w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 " + className}
  >
    {text}
  </button>
  )
}
