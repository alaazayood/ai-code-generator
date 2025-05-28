export interface TextInputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isDarkMode?: boolean;
}

const TextInput = ({ placeholder, value, onChange, isDarkMode = false }: TextInputProps) => {
  return (
    <textarea
      className={`w-full h-72 p-6 text-lg rounded-xl shadow-md transition-all duration-200 ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700 text-white focus:ring-indigo-500' 
          : 'bg-white border-gray-300 focus:ring-indigo-300'
      } border-2 focus:ring-4 focus:border-transparent`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextInput;