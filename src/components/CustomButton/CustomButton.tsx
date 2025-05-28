import React from 'react'

export interface CustomButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  isDarkMode?: boolean;
}

const CustomButton = ({ 
  onClick, 
  children, 
  disabled = false,
  isDarkMode = false 
}: CustomButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-lg font-medium transition-colors ${
        disabled 
          ? 'bg-gray-400 cursor-not-allowed' 
          : isDarkMode
            ? 'bg-indigo-500 hover:bg-indigo-600'
            : 'bg-indigo-600 hover:bg-indigo-700'
      } text-white`}
    >
      {children}
    </button>
  )
}

export default CustomButton