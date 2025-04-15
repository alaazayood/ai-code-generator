import { useState } from 'react'
import { TextInput, CustomButton, CodePreview } from './components'

function App() {
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isArabic, setIsArabic] = useState(false)
  const [generatedCode, setGeneratedCode] = useState('') // أضفنا حالة للكود المولد

  const translations = {
    title: isArabic ? 'مولد الأكواد' : 'Code Generator',
    placeholder: isArabic ? '...أدخل وصفك هنا بالتفصيل' : 'Enter your description here...',
    buttonText: isArabic 
      ? (isLoading ? 'جاري التحويل...' : 'إنشاء الكود') 
      : (isLoading ? 'Generating...' : 'Generate Code'),
    switchLang: isArabic ? 'English' : 'العربية'
  };
  const generateCodeFromText = (text: string, isArabic: boolean) => {
    if (!text.trim()) return isArabic ? "// أدخل وصفًا أولاً" : "// Enter a description first";
  
    // تحليل النص لفهم المتطلبات
    const isButton = text.includes('زر') || text.includes('button');
    const colorMatch = text.match(/أزرق|أحمر|أخضر|blue|red|green/i);
    
    const color = colorMatch ? 
      colorMatch[0].includes('أزرق') || colorMatch[0].includes('blue') ? 'bg-blue-600' :
      colorMatch[0].includes('أحمر') || colorMatch[0].includes('red') ? 'bg-red-600' :
      'bg-green-600' : 'bg-indigo-600';
  
    if (isButton) {
      return isArabic 
        ? `// ${text}\nconst زر = () => {\n  return (\n    <button className="${color} text-white px-4 py-2 rounded">\n      ${text.replace('زر', '').trim() || 'زر'}\n    </button>\n  );\n};`
        : `// ${text}\nconst Button = () => {\n  return (\n    <button className="${color} text-white px-4 py-2 rounded">\n      ${text.replace('button', '').trim() || 'Button'}\n    </button>\n  );\n};`;
    }
  
    // النمط الافتراضي
    return isArabic 
      ? `// ${text}\nconst عنصر = () => {\n  return <div className="p-4">${text}</div>;\n};`
      : `// ${text}\nconst Element = () => {\n  return <div className="p-4">${text}</div>;\n};`;
  };
  
  const handleGenerate = () => {
    setIsLoading(true);
    setTimeout(() => {
      setGeneratedCode(generateCodeFromText(inputText, isArabic));
      setIsLoading(false);
    }, 1500);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="flex justify-end mb-4">
        <button 
          onClick={() => setIsArabic(!isArabic)}
          className="px-4 py-2 bg-indigo-100 rounded-lg text-indigo-600 hover:bg-indigo-200 transition-colors"
        >
          {translations.switchLang}
        </button>
      </div>

      <h1 className="text-4xl font-bold text-center mb-8 text-indigo-600">
        {translations.title}
      </h1>

      <div className="max-w-5xl mx-auto space-y-4">
        <TextInput 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={translations.placeholder}
        />
        
        {generatedCode && <CodePreview code={generatedCode} />}
        <div className="flex justify-end">
          <CustomButton
            onClick={handleGenerate}
            disabled={!inputText.trim() || isLoading}
          >
            {translations.buttonText}
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default App