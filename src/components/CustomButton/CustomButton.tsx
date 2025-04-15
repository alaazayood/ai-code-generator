// src/components/CustomButton/CustomButton.tsx
import React from 'react'

// يجب تصدير الواجهة بشكل صريح
export interface CustomButtonProps {
  onClick: () => void
  children: React.ReactNode
  disabled?: boolean
}

const CustomButton = ({ onClick, children, disabled = false }: CustomButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-lg font-medium ${
        disabled 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-indigo-600 hover:bg-indigo-700'
      } text-white transition-colors`}
    >
      {children}
    </button>
  )
}

export default CustomButton