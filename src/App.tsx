import { useState, useEffect } from 'react'
import { TextInput, CustomButton, CodePreview } from './components'
import { FiMoon, FiSun, FiShare2, FiSave } from 'react-icons/fi'

function App() {
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isArabic, setIsArabic] = useState(false)
  const [generatedCode, setGeneratedCode] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true'
    }
    return false
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
    localStorage.setItem('darkMode', isDarkMode.toString())
  }, [isDarkMode])

  const translations = {
    title: isArabic ? 'مولد الأكواد' : 'Code Generator',
    placeholder: isArabic ? '...أدخل وصفك هنا بالتفصيل' : 'Enter your description here...',
    buttonText: isArabic 
      ? (isLoading ? 'جاري التحويل...' : 'إنشاء الكود') 
      : (isLoading ? 'Generating...' : 'Generate Code'),
    switchLang: isArabic ? 'English' : 'العربية',
    save: isArabic ? 'حفظ' : 'Save',
    share: isArabic ? 'مشاركة' : 'Share'
  }

  const generateCodeFromText = (text: string, isArabic: boolean) => {
    if (!text.trim()) return isArabic ? "// أدخل وصفًا أولاً" : "// Enter a description first"
  
    const isButton = text.includes('زر') || text.includes('button')
    const isForm = text.includes('نموذج') || text.includes('form')
    const colorMatch = text.match(/أزرق|أحمر|أخضر|blue|red|green/i)
    
    const color = colorMatch ? 
      colorMatch[0].includes('أزرق') || colorMatch[0].includes('blue') ? 'bg-blue-600' :
      colorMatch[0].includes('أحمر') || colorMatch[0].includes('red') ? 'bg-red-600' :
      'bg-green-600' : 'bg-indigo-600'
  
    if (isForm) {
      return isArabic 
        ? `// ${text}\nconst نموذج = () => {\n  return (\n    <form className="space-y-4">\n      <input type="text" className="w-full p-2 border rounded" placeholder="أدخل النص" />\n      <button type="submit" className="${color} text-white px-4 py-2 rounded">إرسال</button>\n    </form>\n  );\n};`
        : `// ${text}\nconst Form = () => {\n  return (\n    <form className="space-y-4">\n      <input type="text" className="w-full p-2 border rounded" placeholder="Enter text" />\n      <button type="submit" className="${color} text-white px-4 py-2 rounded">Submit</button>\n    </form>\n  );\n};`
    }

    if (isButton) {
      return isArabic 
        ? `// ${text}\nconst زر = () => {\n  return (\n    <button className="${color} text-white px-4 py-2 rounded">\n      ${text.replace('زر', '').trim() || 'زر'}\n    </button>\n  );\n};`
        : `// ${text}\nconst Button = () => {\n  return (\n    <button className="${color} text-white px-4 py-2 rounded">\n      ${text.replace('button', '').trim() || 'Button'}\n    </button>\n  );\n};`
    }
  
    return isArabic 
      ? `// ${text}\nconst عنصر = () => {\n  return <div className="p-4">${text}</div>;\n};`
      : `// ${text}\nconst Element = () => {\n  return <div className="p-4">${text}</div>;\n};`
  }
  
  const handleGenerate = () => {
    setIsLoading(true)
    setTimeout(() => {
      setGeneratedCode(generateCodeFromText(inputText, isArabic))
      setIsLoading(false)
    }, 1500)
  }

  const handleSave = () => {
    const savedCodes = JSON.parse(localStorage.getItem('savedCodes') || '[]')
    savedCodes.push({ code: generatedCode, timestamp: new Date().toISOString() })
    localStorage.setItem('savedCodes', JSON.stringify(savedCodes))
    alert(isArabic ? 'تم حفظ الكود بنجاح!' : 'Code saved successfully!')
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode)
      alert(isArabic ? 'تم نسخ الكود إلى الحافظة!' : 'Code copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-gray-50 to-gray-100'
    } p-8`}>
      <div className="flex justify-between mb-4">
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-2 rounded-lg ${
            isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-indigo-100 text-indigo-600'
          } hover:opacity-80 transition-colors`}
        >
          {isDarkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
        </button>
        <button 
          onClick={() => setIsArabic(!isArabic)}
          className={`px-4 py-2 ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-indigo-100 text-indigo-600'
          } rounded-lg hover:opacity-80 transition-colors`}
        >
          {translations.switchLang}
        </button>
      </div>

      <h1 className={`text-4xl font-bold text-center mb-8 ${
        isDarkMode ? 'text-white' : 'text-indigo-600'
      }`}>
        {translations.title}
      </h1>

      <div className="max-w-5xl mx-auto space-y-4">
        <TextInput 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={translations.placeholder}
          isDarkMode={isDarkMode}
        />
        
        {generatedCode && (
          <div className="space-y-4">
            <CodePreview code={generatedCode} isDarkMode={isDarkMode} />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleSave}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isDarkMode ? 'bg-gray-800 text-white' : 'bg-indigo-100 text-indigo-600'
                } hover:opacity-80 transition-colors`}
              >
                <FiSave /> {translations.save}
              </button>
              <button
                onClick={handleShare}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isDarkMode ? 'bg-gray-800 text-white' : 'bg-indigo-100 text-indigo-600'
                } hover:opacity-80 transition-colors`}
              >
                <FiShare2 /> {translations.share}
              </button>
            </div>
          </div>
        )}
        
        <div className="flex justify-end">
          <CustomButton
            onClick={handleGenerate}
            disabled={!inputText.trim() || isLoading}
            isDarkMode={isDarkMode}
          >
            {translations.buttonText}
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default App