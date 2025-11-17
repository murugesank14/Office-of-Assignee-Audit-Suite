import React, { useState, useCallback } from 'react';
import { AuditParagraphRequest, AuditParagraphResponse, Language } from '../types';
import { generateAuditParagraph } from '../services/geminiService';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { RefreshCwIcon } from './icons/RefreshCwIcon';

const languageOptions: { id: Language; label: string }[] = [
  { id: 'English', label: 'English' },
  { id: 'Tamil', label: 'தமிழ்' },
  { id: 'Hindi', label: 'हिन्दी' },
];

const getHeadings = (lang: Language): string[] => {
  switch (lang) {
    case 'Tamil':
      return [
        '1. தக்க தலைப்பு',
        '2. தணிக்கை குறிப்பு/அடிப்படை',
        '3. செய்யப்பட்ட நடவடிக்கை',
        '4. தணிக்கை கண்டறிதல்கள்',
        '5. பரிந்துரைகள்',
      ];
    case 'Hindi':
      return [
        '1. उपयुक्त शीर्षक',
        '2. लेखापरीक्षा संदर्भ',
        '3. की गई कार्रवाई',
        '4. लेखापरीक्षा निष्कर्ष',
        '5. सिफारिशें',
      ];
    default: // English
      return [
        '1. Suitable Heading',
        '2. Audit Reference',
        '3. What is Done',
        '4. Audit Findings',
        '5. Audit Recommendations',
      ];
  }
};

const getFontClass = (lang: Language): string => {
    switch (lang) {
        case 'Tamil':
            return 'font-[Noto Sans Tamil,sans-serif]';
        case 'Hindi':
            return 'font-[Noto Sans Devanagari,sans-serif]';
        default:
            return 'font-sans';
    }
}


const AuditParagraphGenerator: React.FC = () => {
  const [auditNotes, setAuditNotes] = useState('');
  const [outputLanguage, setOutputLanguage] = useState<Language>('Tamil');
  const [result, setResult] = useState<AuditParagraphResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState('');

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAuditNotes(e.target.value);
  }, []);

  const handleLanguageChange = useCallback((lang: Language) => {
    setOutputLanguage(lang);
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditNotes.trim()) {
      setError('Audit Notes cannot be empty.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);
    setCopySuccess('');

    try {
      const request: AuditParagraphRequest = { auditNotes, outputLanguage };
      const response = await generateAuditParagraph(request);
      setResult(response);
    } catch (err) {
      setError('Failed to generate audit paragraph. Please check your connection or API key and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      const headings = getHeadings(outputLanguage);
      const fullText = `
${headings[0]}
${result.heading}

${headings[1]}
${result.reference}

${headings[2]}
${result.procedure}

${headings[3]}
${result.findings}

${headings[4]}
${result.recommendations}
    `.trim();

      navigator.clipboard.writeText(fullText).then(() => {
        setCopySuccess('Copied!');
        setTimeout(() => setCopySuccess(''), 2000);
      }, () => {
        setCopySuccess('Failed to copy.');
      });
    }
  };

  const handleRevision = () => {
    setResult(null);
    setCopySuccess('');
  };

  const headings = getHeadings(outputLanguage);

  return (
    <div className="bg-white shadow-lg rounded-xl border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">AI-Assisted Audit Paragraph Generator</h2>
        <p className="mt-1 text-sm text-gray-500">
          Enter audit notes in any language and select an output language to generate a structured paragraph.
        </p>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Output Language
              </label>
              <div className="flex items-center space-x-2 rounded-lg bg-gray-100 p-1">
                {languageOptions.map((lang) => (
                  <button
                    type="button"
                    key={lang.id}
                    onClick={() => handleLanguageChange(lang.id)}
                    className={`w-full px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      outputLanguage === lang.id
                        ? 'bg-white text-indigo-700 shadow'
                        : 'text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="auditNotes" className="block text-sm font-medium text-gray-700 mb-1">
                Audit Notes (in English, Tamil, or Hindi)
              </label>
              <textarea
                id="auditNotes"
                name="auditNotes"
                rows={8}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your observations here. For example:&#10;- Sale of property in Estate File #123 was done for 5 Lakhs, but the guideline value was 8 Lakhs.&#10;- No public auction notice was found in the file."
                value={auditNotes}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <LightbulbIcon className="mr-2" />
                  Generate Draft
                </>
              )}
            </button>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className={`text-xl font-semibold text-gray-900 ${getFontClass(outputLanguage)}`}>Generated Audit Paragraph</h3>
            <div className={`mt-4 space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200 ${getFontClass(outputLanguage)}`}>
              <div>
                <h4 className="font-bold text-gray-800">{headings[0]}</h4>
                <p className="mt-1 text-gray-700 whitespace-pre-wrap">{result.heading}</p>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <h4 className="font-bold text-gray-800">{headings[1]}</h4>
                <p className="mt-1 text-gray-700 whitespace-pre-wrap">{result.reference}</p>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <h4 className="font-bold text-gray-800">{headings[2]}</h4>
                <p className="mt-1 text-gray-700 whitespace-pre-wrap">{result.procedure}</p>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <h4 className="font-bold text-gray-800">{headings[3]}</h4>
                <p className="mt-1 text-gray-700 whitespace-pre-wrap">{result.findings}</p>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <h4 className="font-bold text-gray-800">{headings[4]}</h4>
                <p className="mt-1 text-gray-700 whitespace-pre-wrap">{result.recommendations}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-end space-x-2">
              <button
                onClick={copyToClipboard}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <ClipboardIcon className="mr-2" />
                {copySuccess ? copySuccess : 'Copy All'}
              </button>
              <button
                onClick={handleRevision}
                className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <RefreshCwIcon className="mr-2"/>
                Revise
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditParagraphGenerator;