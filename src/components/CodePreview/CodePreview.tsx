export interface CodePreviewProps {
  code: string;
  isDarkMode?: boolean;
}

const CodePreview = ({ code, isDarkMode = false }: CodePreviewProps) => {
  return (
    <div className={`p-4 rounded-lg font-mono relative ${
      isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-900 text-gray-100'
    }`}>
      <button
        onClick={() => navigator.clipboard.writeText(code)}
        className={`absolute top-2 right-2 p-1 rounded ${
          isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-800'
        }`}
      >
        📋 نسخ
      </button>
      <pre className="overflow-x-auto">{code}</pre>
    </div>
  );
};

export default CodePreview;