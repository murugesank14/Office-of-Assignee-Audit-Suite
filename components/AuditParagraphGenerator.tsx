import React, { useState, useCallback } from 'react';
import { AuditParagraphRequest, AuditParagraphResponse } from '../types';
import { generateAuditParagraph } from '../services/geminiService';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { RefreshCwIcon } from './icons/RefreshCwIcon';

const AuditParagraphGenerator: React.FC = () => {
  const [formData, setFormData] = useState<AuditParagraphRequest>({
    auditNotes: '',
  });
  const [result, setResult] = useState<AuditParagraphResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState('');

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.auditNotes.trim()) {
      setError('Audit Notes cannot be empty.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);
    setCopySuccess('');

    try {
      const response = await generateAuditParagraph(formData);
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
      const fullText = `
1. தக்க தலைப்பு
${result.heading}

2. தணிக்கை குறிப்பு/அடிப்படை
${result.reference}

3. செய்யப்பட்ட நடவடிக்கை
${result.procedure}

4. தணிக்கை கண்டறிதல்கள்
${result.findings}

5. பரிந்துரைகள்
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

  return (
    <div className="bg-white shadow-lg rounded-xl border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">AI-Assisted Tamil Audit Paragraph Generator</h2>
        <p className="mt-1 text-sm text-gray-500">
          Enter your audit notes in English to generate a fully structured audit paragraph in Tamil.
        </p>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="auditNotes" className="block text-sm font-medium text-gray-700 mb-1">
                Audit Notes (in English)
              </label>
              <textarea
                id="auditNotes"
                name="auditNotes"
                rows={8}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your observations here. For example:&#10;- Sale of property in Estate File #123 was done for 5 Lakhs, but the guideline value was 8 Lakhs.&#10;- No public auction notice was found in the file."
                value={formData.auditNotes}
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
                  Generate Tamil Draft
                </>
              )}
            </button>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">உருவாக்கப்பட்ட தணிக்கை பத்தி (Generated Audit Paragraph)</h3>
            <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200 font-[Latha,sans-serif]">
              <div>
                <h4 className="font-bold text-gray-800">1. தக்க தலைப்பு</h4>
                <p className="mt-1 text-gray-700 whitespace-pre-wrap">{result.heading}</p>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <h4 className="font-bold text-gray-800">2. தணிக்கை குறிப்பு/அடிப்படை</h4>
                <p className="mt-1 text-gray-700 whitespace-pre-wrap">{result.reference}</p>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <h4 className="font-bold text-gray-800">3. செய்யப்பட்ட நடவடிக்கை</h4>
                <p className="mt-1 text-gray-700 whitespace-pre-wrap">{result.procedure}</p>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <h4 className="font-bold text-gray-800">4. தணிக்கை கண்டறிதல்கள்</h4>
                <p className="mt-1 text-gray-700 whitespace-pre-wrap">{result.findings}</p>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <h4 className="font-bold text-gray-800">5. பரிந்துரைகள்</h4>
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
