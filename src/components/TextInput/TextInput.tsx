// src/components/TextInput/TextInput.tsx
export interface TextInputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextInput = ({ placeholder, value, onChange }: TextInputProps) => {
  return (
    <textarea
      className="w-full h-72 p-6 text-lg border-2 border-gray-300 rounded-xl shadow-md focus:ring-4 focus:ring-indigo-300 focus:border-transparent transition-all duration-200"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextInput;