// src/components/CodePreview/CodePreview.tsx

export interface CodePreviewProps {
  code: string;
}

const CodePreview = ({ code }: CodePreviewProps) => {
  return (
    <div className="p-4 bg-gray-800 rounded-lg
     text-gray-100 font-mono relative">
      <button
        onClick={() => navigator.clipboard.writeText(code)}
        className="absolute top-2 right-2 p-1
         hover:bg-gray-700 rounded"
      >
        📋 نسخ
      </button>
      <pre>{code}</pre>
    </div>
  );
};

export default CodePreview;